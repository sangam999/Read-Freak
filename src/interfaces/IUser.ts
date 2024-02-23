import mongoose from "mongoose";

export default interface User {
    username: string;
    email: string;
    password: number;
    role:mongoose.Types.ObjectId[];

}