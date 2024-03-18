import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import { Response } from "express";

export class createUserservice {
    static async createUserservice(username: string, password: string, email: string, res: Response): Promise<IUser> {
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
            const newUser: { password: string; name: string; email: string } = {
                name: username,
                password: hashedPassword,
                email: email
            };

            // Save the user to the database
            const createdUser = await UserSchema.create(newUser);

            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Error creating user");
        }
    }
}
