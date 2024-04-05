import IBooksPage from "../../src/interfaces/IBooksPage";
import booksModel from "../model/schema/BooksSchema";
import { Book, BookSection } from "../api/response/Booksresponse";

export class BookService {

    async getallbooks(id: string): Promise<{
        books: {
            bookId: string; // Add bookId field
            year: number;
            author: string;
            genre: string;
            title: string;
        }[];
        bookSection: BookSection;
    }> {
        try {
            const bookData: IBooksPage[] = await booksModel.find({id: id});

            if (bookData.length === 0) {
                throw new Error("Books not found");
            }

            // Construct an array to store Book objects
            const books: Book[] = [];

            // Iterate through bookData and construct Book objects
            for (const bookInfo of bookData) {
                const book: Book = new Book(bookInfo);
                books.push(book);
            }

            // Construct BookSection object containing all books
            const bookSection: BookSection = new BookSection(
                books, // Pass the array containing all Book objects
                bookData[0].bookCoverURL, // Assuming bookCoverURL is a property in IBooksPage representing the book cover URL
                bookData[0].summary // Assuming summary is a property in IBooksPage representing the book summary
            );

            // Construct the response including bookId
            const response = {
                books: books.map(book => ({
                    bookId: book.bookId,
                    title: book.title,
                    author: book.author,
                    year: book.year,
                    genre: book.genre
                })),
                bookSection: bookSection
            };

            return response;
        } catch (error) {
            // Handle errors
            console.error("Error fetching books:", error);
            throw new Error("Failed to fetch books");
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


    async updateBook(id: string, body: Record<string, any>) {
        if (!body) {
            return {
                message: "No data found for updating"
            }
        }
        try {
            await booksModel.findByIdAndUpdate(id, {$set: body});
            return {
                message: "Book updated successfully"
            }
        } catch (err) {
            return {
                message: "Book not updated"
            }
        }
    }

    async deleteBook(id: string) {
        try {
            await booksModel.findByIdAndDelete(id);
            return {
                message: "Book deleted successfully"
            };
        } catch (error) {
            return {
                message: "Book not found"
            };
        }
    }


    async searchBooks(title: string, body: Record<string, any>): Promise<IBooksPage | { message: string } | null> {
        try {
            if (!body) {
                return { message: "No data found" };
            }

            // Use your data model or repository to search for books by title
            const result = await booksModel.findOne({ title: title });

            return result;
        } catch (error) {
            // Handle any errors that occur during the search
            throw new Error((error as Error).message);
        }
    }

}

