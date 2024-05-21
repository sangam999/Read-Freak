import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { IUser } from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";

const JWT_SECRET = "your-secret-key";

export class AuthService {
    async signUp(username: string, password: string, email: string): Promise<IUser> {
        try {
            const genRanHex = this.hexIdGenerator(16);
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: IUser = {
                _id: genRanHex,
                name: username,
                email: email,
                password: hashedPassword,
                role: "user",
                isActive: true
            };

            const insertedUser = await UserSchema.create(user);
            return insertedUser;
        } catch (err) {
            console.error("Error signing up:", err);
            throw new Error("Error signing up");
        }
    }

    hexIdGenerator(size: number): string {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }


    async login(email: string, password: string): Promise<{ token: string, _id: string, name: string, role: string }> {
        try {
            const user: IUser | null = await UserSchema.findOne({email: email});
            if (!user) {
                throw new Error("Invalid email");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: email,
                role: user.role
            }, JWT_SECRET, {expiresIn: '4h'});

            return {
                token,
                _id: user._id,
                name: user.name,
                role: user.role
            };
        } catch (error) {
            console.error("Error logging in:", error);
            throw new Error("Error logging in");
        }
    }


    async logOut(req: Request, res: Response): Promise<void> {
        try {
            // Clear the token cookie
            res.clearCookie('token');
        } catch (error) {
            console.error("Error logging out:", error);
            throw new Error("Error logging out");
        }
    }

    async verifyToken(token: string): Promise<IUser> {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as IUser;
            return decodedToken;
        } catch (error) {
            console.error("Invalid token:", error);
            throw new Error("Invalid token");
        }
    }
}
