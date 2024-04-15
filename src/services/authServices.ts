import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser} from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import { Response } from 'express';

const JWT_SECRET = "your-secret-key";

export class AuthService {
    async signUp(username: string, password: string, email: string) {
        try {
            const genRanHex = this.hexaIdgen(16);
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: { password: string; role: string; name: string; _id: string; email: string, isActive: true } = {
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
            console.error(err);
            throw new Error("Error signing up");
        }
    }

    hexaIdgen(size: number) {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    async  login(email: string, password: string, res: Response) {
        try {
            const user: IUser | null = await UserSchema.findOne({ email: email });
            if (!user) {
                throw new Error("Invalid username");
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
            }, JWT_SECRET, { expiresIn: '4h' });

            // Set the token in cookies in the response headers
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 4 * 60 * 60 * 1000 // 4 hours in milliseconds
            });

            // Return token along with user ID and name
            return {
                token,
                _id: user._id,
                name: user.name,
                role: user.role

            };
        } catch (error) {
            console.error(error);
            throw new Error("Error logging in");
        }
    }

     async logOut(): Promise<string> {
        try {
            // Generate a token with an expiration date in the past
            const expiredToken = jwt.sign({ _id: 'user.id', name: 'user.name', email: 'user.email', role: 'user.role' }, JWT_SECRET, { expiresIn: 0 });
            return expiredToken;
        } catch (error) {
            console.error("Error logging out:", error);
            throw new Error("Error logging out");
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as IUser;
            return decodedToken;
        } catch (error) {
            console.error(error);
            throw new Error("Invalid token");
        }
    }


}