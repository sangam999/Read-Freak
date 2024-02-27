import mongoose from "mongoose"
    import User from "./IUser";

    export default interface IHomePage {
    banner?:Text;
    title?: Text;
    img?:string;
    summary: Array<string>;
    author:string;
    ratings: string;
    reviews: string;
    recommendations?: string;

}