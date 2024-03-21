import IBooksPage from "../../src/interfaces/IBooksPage";
import booksModel from "../model/schema/BooksSchema";
import { Book, BookSection } from "../api/response/Booksresponse";

export class BookService {
    async getBook(id: string): Promise<{
        book: { year: number; author: string; genre: string; title: string };
        bookSection: BookSection
    }> {
        try {
            const bookData: IBooksPage[] = await booksModel.find({ id: id });

            if (bookData.length === 0) {
                throw new Error("Book not found");
            }

            // Construct Book object
            const book: Book = new Book(bookData[0]);

            // Construct BookSection object
            const bookSection: BookSection = new BookSection(
                [book], // Pass an array containing the Book object
                bookData[0].bookCoverURL, // Assuming bookCoverURL is a property in IBooksPage representing the book cover URL
                bookData[0].summary // Assuming summary is a property in IBooksPage representing the book summary
            );

            const response = {
                book: {
                    title: book.title,
                    author: book.author,
                    year: book.year,
                    genre: book.genre
                },
                bookSection: bookSection
            };

            return response;
        } catch (error) {
            // Handle errors
            console.error("Error fetching book:", error);
            throw new Error("Failed to fetch book");
        }
    }

    async addBook(title: string, author: string, year: string, genre: string) {
        const id = `book_${title.toLowerCase().split(" ").join("_")}`;
        const book: { year: string; author: string; genre: string; _id: string; title: string } = {
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
