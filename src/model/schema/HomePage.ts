import IHomePage from "../../interfaces/Ihomepage";
import mongoose, { Model } from "mongoose";



const { Schema, model } = require("mongoose");

const homepageSchema = new Schema(
    {
        banner : {
            type: String,
            required: true,
        },
        tittle :{
            type: String,
            requried: true
        },
        Img : {
            type : String,
            required : true
        },

        summary: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        ratings: {
            type: String,
            required: true,
        },
        reviews: {
            type: Number,
            required: true,
        },
        recommendations: {
            type : String,
            required : true,
        }
    },)
const HomePageModel: Model<IHomePage> = mongoose.model<IHomePage>('Home', homepageSchema);

export default HomePageModel;
