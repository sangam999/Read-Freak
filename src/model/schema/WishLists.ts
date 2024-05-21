
import mongoose, { Model } from "mongoose";
import {IWishLists} from "../../interfaces/IWishLists";



const { Schema,model } = require("mongoose");

const wishListsSchema = new Schema(
    {
        wishlists:Array,
        userId:String,

    },)
const wishListsModel: Model<IWishLists> = mongoose.model<IWishLists>('wishLists', wishListsSchema);

export default wishListsModel;
