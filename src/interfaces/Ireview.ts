import mongoose from "mongoose"

export default interface Ireviewpage {
    bookId: string;
    rating: string;
    reviewText:string;
    reviewBy:string;
    reviewDate: string;
}