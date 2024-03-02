  import mongoose from "mongoose";

export default class userResponse {
    _id?:string;
    username: string;
    email: string;
    password?: number;
    role?:["user,admin"];


    constructor(
        username: string,
        email: string,
        _id?:string,
        password?: number,
        role?: ["user,admin"],


    ) {

        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;

    }
}