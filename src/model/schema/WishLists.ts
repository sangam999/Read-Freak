
import mongoose, { Model } from "mongoose";
import IWishLists from "../../interfaces/IWishLists";



const { Schema,model } = require("mongoose");

const wishListsSchema = new Schema(
    {

        book_Id :String,
        user_Id: String,
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
