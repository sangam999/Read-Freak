import mongoose from "mongoose"


export default interface IBooksPage {
    summary: string;
    bookCoverURL: string;
    bookId: string;
    title: string;
    author:string;
    year: string;
    genre: string;
}