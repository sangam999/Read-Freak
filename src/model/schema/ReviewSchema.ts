
import mongoose, {Model, Schema} from "mongoose";
import Ireviewpage from "../../interfaces/Ireview";



const reviewSchema = new Schema(
    {
        review_id : {
            type: String,
            required: true,
        },
        book_id :{
            type: String,
            requried: true
        },
        user_id : {
            type : String,
            required : true
        },

        rating: {
            type: String,
            required: true,
        },
        review_text: {
            type: String,
            required: true,
        },
        review_by: {
            type: String,
            required: true,
        },
        review_date: {
            type: Number,
            required: true,
        }
    },)
const reviewpageModel: Model<Ireviewpage> = mongoose.model<Ireviewpage>('review',reviewSchema);

export default reviewpageModel;