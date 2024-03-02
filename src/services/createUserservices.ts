import { User, users } from "./User";
import bcrypt from "bcrypt";

export class UserService {
    static async createUser(username: string, password: string, email: string): Promise<User> {
        // Check if the username or email is already taken
        if (users.some(user => user.username === username)) {
            throw new Error("Username is already taken");
        }
        if (users.some(user => user.email === email)) {
            throw new Error("Email is already registered");
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const user: User = {
            id: String(users.length + 1),
            username,
            password: hashedPassword,
            email
        };

        // Save the user to the list of users
        users.push(user);

        return user;
    }

    static getUserById(id: string): User | undefined {
        return users.find(user => user.id === id);
    }

    static getUserByUsername(username: string): User | undefined {
        return users.find(user => user.username === username);
    }

    static getUserByEmail(email: string): User | undefined {
        return users.find(user => user.email === email);
    }
}
