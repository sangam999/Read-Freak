
import mongoose, { Model } from "mongoose";
import IWishLists from "../../interfaces/IWishLists";



const { Schema,model } = require("mongoose");

const wishListsSchema = new Schema(
    {

        bookId :{
            type:String,
            required:false
        },
        userId: {
            type:String,
            required:false
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
const wishListsModel: Model<IWishLists> = mongoose.model<IWishLists>('wishLists', wishListsSchema);

export default wishListsModel;
