import mongoose from "mongoose"


export default interface IBooksPage {
    _id: string;
    title: string;
    author:string;
    year: string;
    genre: string;
}