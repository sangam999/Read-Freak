import mongoose from "mongoose"
import User from "./IUser";

export default interface IBooksPage {
    id?: string;
    tittle: string;
    author:string;
    year: string;

}