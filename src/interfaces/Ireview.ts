import mongoose from "mongoose"

export default interface Ireviewpage {
    _id?: string;
    bookId: string;
    rating: string;
    reviewText:string;
    reviewBy:string;
    reviewDate: string;
}