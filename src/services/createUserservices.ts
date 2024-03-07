import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import userSchema from "../model/schema/userSchema";
import userSchemaModel from "../model/schema/userSchema";
import userResponse from "../api/response/userResponse";
import * as string_decoder from "string_decoder";
import {HydratedDocument, QueryWithHelpers} from "mongoose";


export class createUserservice {
    static async createUserservice(username: string, password: string, email: string): Promise<IUser> {

        const ifUsernameData: IUser[] = await UserSchema.find({username: username});
        const ifEmailData: IUser[] = await UserSchema.find({username: username})
        // Check if the username or email is already taken
        if (ifUsernameData.length) {
            throw new Error("Username is already taken");
        }
        if (ifEmailData.length) {
            throw new Error("Email is already registered");
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        let user: IUser
       = <IUser>{
            username: String(UserSchema.length + 1),
            password: hashedPassword,
        };

        // Save the user to the list of users
        userSchemaModel.insertMany([user]);

        return user;
    }

    static getUserById(id: string): QueryWithHelpers<Array<HydratedDocument<IUser, {}, {}>>, HydratedDocument<IUser, {}, {}>, {}, IUser, "find"> {
        return UserSchema.find((user: { id: string; }) => user.id === id);
    }

    static getUserByUsername(username: string):QueryWithHelpers<Array<HydratedDocument<IUser, {}, {}>>, HydratedDocument<IUser, {}, {}>, {}, IUser, "find">{
        return userSchema.find((user: { username: string; })=> user.username === username);
    }

    static getUserByEmail(email: string): QueryWithHelpers<Array<HydratedDocument<IUser, {}, {}>>, HydratedDocument<IUser, {}, {}>, {}, IUser, "find"> {
        return userSchema.find((user: { email: string; }) => user.email === email);
    }
}
