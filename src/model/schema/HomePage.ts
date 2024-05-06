import IHomePage from "../../interfaces/Ihomepage";
import mongoose, { Model } from "mongoose";



const { Schema, model } = require("mongoose");

const homepageSchema = new Schema(
    {

        banner :{
            type: String,
            requried: true,
        },
        recommendations: {
            type: String,
            required: true,
        },

    },)
const HomePageModel: Model<IHomePage> = mongoose.model<IHomePage>('Home', homepageSchema);

export default HomePageModel;
