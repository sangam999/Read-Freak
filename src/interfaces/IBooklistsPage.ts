import mongoose from "mongoose"
import User from "./IUser";

export default interface IBooklistsPage {
    book_id?: string;
    tittle: string;
    summary: string;
    genre: string;
    author:string;
    review:string;
    date: string;

}