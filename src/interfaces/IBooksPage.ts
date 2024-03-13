import mongoose from "mongoose"
import User from "./IUser";

export default interface IBooksPage {
    _id: string;
    title: string;
    author:string;
    year: string;
    genre: string;
}