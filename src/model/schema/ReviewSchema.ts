
import mongoose, {Model} from "mongoose";
import Ireviewpage from "../../interfaces/Ireview";
const { Schema, model } = require("mongoose");




const reviewSchema = new Schema(
    {
        bookId :{
            type: String,
            requried: true
        },

        rating: {
            type: String,
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
        reviewBy: {
            type: String,
            required: true,
        },
        reviewDate: {
            type: Date,
            required: true,
        }
    });
const reviewpageModel: Model<Ireviewpage> = mongoose.model<Ireviewpage>('review',reviewSchema);

export default reviewpageModel;