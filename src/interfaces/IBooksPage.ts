import mongoose from "mongoose"
import User from "./IUser";

export default interface IBooksPage {
    title: string;
    author:string;
    year: string;
}