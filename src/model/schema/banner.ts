import IHomePage from "../../interfaces/Ihomepage";
import mongoose, { Model } from "mongoose";
import {banner} from "../../api/response/banner";



const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
    {

        greetings:{
            type: String,
            requried: true
        },
        username: {
            type: String,
            required: true,
        },

    },)
const bannerModel: Model<IHomePage> = mongoose.model<IHomePage>('banner', bannerSchema);

export default bannerModel;
