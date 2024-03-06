import IBooksPage from "../../interfaces/IBooklsPage";
import mongoose, {Model, Schema} from "mongoose";

const booksSchema = new Schema(
    {
        id : String,
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
        }
    },)
const booksModel: Model<IBooksPage> = mongoose.model<IBooksPage>('books', booksSchema);

export default booksModel;
