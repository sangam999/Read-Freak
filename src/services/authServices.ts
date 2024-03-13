import userSchemaModel from "../model/schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import userSchema from "../model/schema/userSchema";
import e from "express";

const JWT_SECRET = "your-secret-key";

export class AuthService {
    async signUp(username: string, password: string, email: string) {
        try {
            // const hashedPassword = await bcrypt.hash(password, 10);
            const user: IUser = {
                name: username,
                email: email,
                password: password,
                role: "user"
            };

            const insertUser = await userSchemaModel.insertMany([user]);
            return insertUser;
        } catch (err) {
            console.log(err);
        }
    }
    async login(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await userSchemaModel.find({username: username,password:password});
        } catch (err) {
            // @ts-ignore

        }
        return userSchemaModel;
    }



    async verifyToken(token: string){
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
            return decodedToken;
        }
    catch (error){

        return null;
        }
    }
}
