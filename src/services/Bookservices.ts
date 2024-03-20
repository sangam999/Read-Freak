import IBooksPage from "../../src/interfaces/IBooksPage";
import booksModel from "../model/schema/BooksSchema";

export class BookService {

    async getBook(id: string): Promise<IBooksPage[]> {
        return booksModel.find({ id: id });
    }

    async addBook(title: string, author: string, year: string, genre: string) {
        const id = `book_${title.toLowerCase().split(" ").join("_")}`;
        const book: IBooksPage = {
            _id: id,
            title: title,
            author: author,
            year: year,
            genre: genre
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

    async updateBook(title: string, year: string) {
        try {
            const updatebook = await booksModel.updateOne({ title: title }, { $set: { year: year } });
            if (updatebook.modifiedCount) {
                return updatebook;
            }
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async deleteBook(id: string) {
        try {
            await booksModel.findByIdAndDelete(id);
            return {
                message: "Book deleted successfully"
            }
        } catch (err) {
            return {
                message: "Book not found"
            }
        }
    }

    async searchBooks(query: string): Promise<IBooksPage[]> {
        try {
            const books = await booksModel.find({
                $or: [
                    { title: { $regex: new RegExp(query, 'i') } },
                    { author: { $regex: new RegExp(query, 'i') } },
                    { genre: { $regex: new RegExp(query, 'i') } }
                ]
            });
            return books;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}