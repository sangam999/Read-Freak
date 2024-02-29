import config from "../config/config";
import User from "../interfaces/IUser";
import UserModel from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import IUser from "../interfaces/IUser";


export class authService{
    static login = async (email: string, password: number):Promise<{ user: IUser; token: string }> =>
    {
        try {
            // @ts-ignore
            let user = await UserModel.findOne({  email  });
            // @ts-ignore
            if(!user || !await bcrypt.compare(password, user.password))
            {
                throw new Error("user not registered")
            }
            const token = this.generateToken(user);
            user = user.toObject();
            Reflect.deleteProperty(user, 'password');
            return {user, token};

        } catch (error) {
            console.log(`Error in Auth Service ${error}`);
            throw error;

        }
    }
    private static generateToken = (user: User) :string=> {
        const {JWT_KEY} = config ;
        if (!JWT_KEY) {
            throw new Error("JWT secret key not found in config");
        }
        const payload = {
            email: user.email,
            user_id:user.username,
        };
        let Token = jwt.sign(payload, JWT_KEY!, {
            expiresIn: "1h",
        });
        return Token;

    }

}