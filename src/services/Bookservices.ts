import {Book} from "../api/response/Booksresponse";
import booksModel from "../model/schema/BooksSchema";
import IBooksPage from "../interfaces/IBooklsPage";
import booksSchema from "../model/schema/BooksSchema";

export class BookService {

    async getBook(id: string): Promise<IBooksPage[]> {
        return booksModel.find({id: id})
    }

    async addBook(title: string, author: string, year: string) {
        const book: IBooksPage = {
            title: title,
            author: author,
            year: year
        };

        try {
            const update = await booksModel.insertMany([book]);
            return update;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async getAllBooks(): Promise<IBooksPage[]> {
        return booksModel.find({});
    }


    async updateBook(title:string, year: string) {
        try {
            const updatebook = await booksModel.updateOne({title:title},{$set: {year:year}});
            if (updatebook.modifiedCount) {
                return updatebook;
            }
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async deleteBook(title: string) {
        try {
            const deleted = await booksModel.findOneAndDelete({title: title});
            return deleted;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async deletebook(): Promise<IBooksPage[]> {
        return booksModel.find();
    }
}
