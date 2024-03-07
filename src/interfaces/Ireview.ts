import mongoose from "mongoose"
import User from "./IUser";

export default interface Ireviewpage {
    bookId: string;
    rating: string;
    reviewText:string;
    reviewBy:string;
    reviewDate: string;
}