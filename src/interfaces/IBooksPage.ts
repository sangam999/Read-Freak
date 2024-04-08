import mongoose from "mongoose"


export default interface IBooksPage {
    bookId: string;
    title: string;
    author:string;
    year: string;
    genre: string;
}