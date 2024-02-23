import mongoose from "mongoose";

export default class userResponse {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password?: number;
    role?: mongoose.Types.ObjectId[];


    constructor(
        username: string,
        email: string,
        _id?: mongoose.Types.ObjectId,
        password?: number,
        role?: mongoose.Types.ObjectId[],


    ) {

        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;

    }
}