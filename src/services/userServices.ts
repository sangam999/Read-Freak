import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import bcrypt from "bcrypt";


export class UserService {
    static async createUser(username: string, password: string, email: string): Promise<IUser> {
        try {
            // Check if the username or email is already taken
            const existingUsername = await UserSchema.findOne({ username: username });
            if (existingUsername) {
                throw new Error("Username is already taken");
            }

            const existingEmail = await UserSchema.findOne({ email: email });
            if (existingEmail) {
                throw new Error("Email is already registered");
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user object
            const newUser: IUser = {
                name: username,
                password: hashedPassword,
                email: email,
                isActive: true // user is active by default
            };

            // Save the user to the database
            const createdUser = await UserSchema.create(newUser);

            return createdUser;
        } catch (error) {
            throw new Error("Error creating user: " + error.message);
        }
    }

    static async activateUser(userId: string): Promise<IUser | null> {
        try {
            const user = await UserSchema.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            user.isActive = true;
            await user.save();
            return user;
        } catch (error) {
            throw new Error("Error activating user: " + error.message);
        }
    }

    static async deactivateUser(userId: string): Promise<IUser | null> {
        try {
            const user = await UserSchema.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            user.isActive = false;
            await user.save();
            return user;
        } catch (error) {
            throw new Error("Error deactivating user: " + error.message);
        }
    }
}
