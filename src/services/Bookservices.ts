import IBooksPage from "../../src/interfaces/IBooksPage";
import booksModel from "../model/schema/BooksSchema";
import { AddBook, Book, BookSection } from "../api/response/Booksresponse";



export class BookService {

    async getallbooks(id: string): Promise<{
        bookSection: BookSection;
    }> {
        try {
            const bookData: IBooksPage[] = await booksModel.find({ bookId: id });
            const addBook: AddBook = new AddBook('Add Book', 'http://localhost:3000/addbooks');

            const books: Book[] = [];

            for (const bookInfo of bookData) {
                const book: Book = new Book(bookInfo);
                books.push(book);
            }

            const bookSection: BookSection = new BookSection(books, addBook);

            const response = {
                bookSection: bookSection
            };

            return response;
        } catch (error) {
            console.error("Error fetching books:", error);
            throw new Error("Failed to fetch books");
        }
    }

    async  getBookById(id: string): Promise<{ bookSection: BookSection }> {
        try {
            const bookData: IBooksPage | null = await booksModel.findOne({ _id: id });

            if (!bookData) {
                throw new Error("Book not found");
            }

            const addBook: AddBook = new AddBook('Add Book', 'http://localhost:3000/addbooks');
            const book: Book = new Book(bookData);
            const bookSection: BookSection = new BookSection([book], addBook);

            return { bookSection };
        } catch (error) {
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

    async updateBook(id: string, body: Record<string, any>) {
        if (!body) {
            return {
                message: "No data found for updating"
            }
        }
        try {
            await booksModel.findByIdAndUpdate(id, { $set: body });
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

    async searchBooks(title: string, body:Request): Promise<IBooksPage | { message: string } | null> {
        try {
            // Use your data model or repository to search for books by title
            const result = await booksModel.findOne({ title: title });

            return result;
        } catch (error) {
            // Handle any errors that occur during the search
            throw new Error((error as Error).message);
        }
    }
}
