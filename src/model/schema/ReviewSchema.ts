
import mongoose, {Model, Schema} from "mongoose";
import Ireviewpage from "../../interfaces/Ireview";



const reviewSchema = new Schema(
    {
        _id: { type: String, required:false},
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
            type: Number,
            required: true,
        }
    },)
const reviewpageModel: Model<Ireviewpage> = mongoose.model<Ireviewpage>('review',reviewSchema);

export default reviewpageModel;