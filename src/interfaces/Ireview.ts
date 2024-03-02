import mongoose from "mongoose"
import User from "./IUser";

export default interface Ireviewpage {
    review_id?: string;
    book_id?: string;
    user_id?: string;
    rating: string;
    review_text:string;
    review_by:string;
    review_date: string;

}