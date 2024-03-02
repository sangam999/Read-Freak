import { User, users, UserRole } from "./User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

export class AuthService {
    static async signUp(username: string, password: string, role: UserRole): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = {
            id: String(users.length + 1),
            username,
            password: hashedPassword,
            role
        };
        users.push(user);
        return user;
    }

    static async login(username: string, password: string): Promise<string | null> {
        const user = users.find(user => user.username === username);
        if (!user) {
            return null; // User not found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null; // Incorrect password
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    static async verifyToken(token: string): Promise<{ userId: string, role: UserRole } | null> {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, role: UserRole };
            return decodedToken;
        } catch (error) {
            return null;
        }
    }
}
