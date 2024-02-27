import IBooklistsPage from "../../interfaces/IBooklistsPage";


const { Schema, model } = require("mongoose");
import mongoose, { Model } from "mongoose";

const booksSchema = new Schema(
    {
        book_id : {
            type: String,
            required: true,
        },
        tittle :{
            type: String,
            requried: true
        },
        summary : {
            type : String,
            required : true
        },

        genre: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        }
    },)
const booklistsModel: Model<IBooklistsPage> = mongoose.model<IBooklistsPage>('booklists', booksSchema);

export default booklistsModel;
