import userSchemaModel from "../model/schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";
import UserSchema from "../model/schema/userSchema";
import userSchema from "../model/schema/userSchema";

const JWT_SECRET = "your-secret-key";

export class AuthService {
    static async signUp(username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IUser = {
            // id: String(users.length + 1),
            username: username,
            email: email,
            password: hashedPassword,
            role: "user"

        };
        try {
            await userSchemaModel.insertMany([user]);
        } catch (err) {
            // @ts-ignore

        }


        return user;
    }
    static async login(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await userSchemaModel.find({username: username,password:password});
        } catch (err) {
            // @ts-ignore

        }


        return userSchemaModel;
    }



    static async verifyToken(token: string){
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
            return decodedToken;
        }
    catch (error){

        return null;
        }
    }
}
