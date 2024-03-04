import IBooksPage from "../../interfaces/IBooklsPage";
import mongoose, {Model, Schema} from "mongoose";

const booksSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        title :{
            type: String,
            requried: true
        },

        author: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        }
    },)
const booksModel: Model<IBooksPage> = mongoose.model<IBooksPage>('books', booksSchema);

export default booksModel;
