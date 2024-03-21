import mongoose from "mongoose"


export default interface IBooksPage {
    summary: string;
    bookCoverURL: string;
    _id: string;
    title: string;
    author:string;
    year: string;
    genre: string;
}