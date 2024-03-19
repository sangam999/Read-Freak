import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";

const JWT_SECRET = "your-secret-key";

export class AuthService {
    async signUp(username: string, password: string, email: string) {
        try {
            const genRanHex = this.hexaIdgen(16);const hashedPassword = await bcrypt.hash(password, 10);
            const user: IUser = {
                _id: genRanHex,
                name: username,
                email: email,
                password: hashedPassword,
                role: "user"
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

    async login(email: string, password: string) {
        try {
            const user = await UserSchema.findOne({ email: email });
            if (!user) {
                throw new Error("Invalid username");
            }

            const isPasswordValid =await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {expiresIn: '4h'});
            return token;
        } catch (error) {
            console.error(error);
            throw new Error("Error logging in");
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
            return decodedToken;
        } catch (error) {
            console.error(error);
            throw new Error("Invalid token");
        }
    }
}
