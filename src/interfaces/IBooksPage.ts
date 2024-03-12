import mongoose from "mongoose"
import User from "./IUser";

export default interface IBooksPage {
    _id: any;
    title: string;
    author:string;
    year: string;
    genre: string;
}