import { IUser } from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import bcrypt from "bcrypt";
import { userResponse } from "../api/response/userResponse"; // Assuming the userResponse class is defined in a file named userResponse.ts

export class UserService {
    async createUser(username: string, password: string, email: string): Promise<userResponse> {
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
            const newUser: { password: string; name: string; isActive: boolean; email: string } = {
                name: username,
                password: hashedPassword,
                email: email,
                isActive: true // user is active by default
            };

            // Save the user to the database
            const createdUser = await UserSchema.create(newUser);

            // Construct userResponse object
            const response: userResponse = new userResponse(
                createdUser._id,
                createdUser.name,
                createdUser.email,
                createdUser.password,
                createdUser.role,
                createdUser.isActive
            );

            return response;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async activateUser(userId: string) {
        try {
            await UserSchema.findByIdAndUpdate(userId, {$set: {isActive: true}});

            return {
                message: 'User activated'
            }

        } catch (error) {
            return {
                message: 'User not found/ Could not be activated'
            }
        }
    }

    async deactivateUser(userId: string): Promise<userResponse | null> {
        try {
            const user = await UserSchema.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            user.isActive = false;
            await user.save();

            // Construct userResponse object
            const response: userResponse = new userResponse(
                user._id,
                user.name,
                user.email,
                user.password,
                user.role,
                user.isActive
            );

            return response;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
