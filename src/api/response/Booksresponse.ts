import IBooksPage from "../../interfaces/IBooksPage";

export class Book {
    title: string;
    author: string;
    year: number;
    genre: string;

    constructor(book: IBooksPage) {
        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
    }
}

export class BookSection {
    book: Book[];
    bookCover: string;
    summary: string;

    constructor(
        book: Book[],
        bookCover: string,
        summary: string)
    {
        this.book = book;
        this.bookCover = this.constructBookCoverURL(bookCover);
        this.summary = summary;

    }

    private constructBookCoverURL(bookCover: string): string {
        const bookCoverURL = "https://via.placeholder.com/300"; // Example placeholder URL
        return bookCoverURL;
    }
}
