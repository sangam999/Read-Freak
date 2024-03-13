
import mongoose, { Model } from "mongoose";
import IUser from "../../interfaces/IUser";

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: String
    },)
const userSchemaModel: Model<IUser> = mongoose.model<IUser>('user', userSchema);

export default userSchemaModel;