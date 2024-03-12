import IHomePage from "../../interfaces/Ihomepage";
import mongoose, { Model } from "mongoose";



const { Schema, model } = require("mongoose");

const recentActivitiesSchema = new Schema(
    {

        book_id :{
            type: String,
            requried: true
        },
        review_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        bookreview: {
            type : String,
            required : true,
        },
        booktitle: {
            type : String,
            required : true,
        },
        bookauthor: {
            type : String,
            required : true,
        }
    },)
const recentActivitiesModel: Model<IHomePage> = mongoose.model<IHomePage>('recentActivities', recentActivitiesSchema);

export default recentActivitiesModel;