import IBooksPage from "../../interfaces/IBooksPage";
import mongoose, {Model, Schema} from "mongoose";

const booksSchema = new Schema(
    {
        _id : String,
        title :{
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true,
        },

        year: {
            type: String,
            required: true,
        },
        genre: String
    },)
const booksModel: Model<IBooksPage> = mongoose.model<IBooksPage>('books', booksSchema);

export default booksModel;
