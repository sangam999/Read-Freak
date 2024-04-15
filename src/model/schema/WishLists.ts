import IHomePage from "../../interfaces/Ihomepage";
import mongoose, { Model } from "mongoose";



const { Schema, model } = require("mongoose");

const wishListsSchema = new Schema(
    {

        book_Id :{
            type: String,
            requried: true
        },
        user_Id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type : String,
            required : true,
        },
        genre: {
            type : String,
            required : true,
        }
    },)
const wishListsModel: Model<IHomePage> = mongoose.model<IHomePage>('wishLists', wishListsSchema);

export default wishListsModel;
