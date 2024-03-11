import IBooksPage from "../../interfaces/IBooksPage";

export class Book {

    title: string;
    author: string;
    year: number;
    genre: string;

    constructor( book: IBooksPage) {

        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
    }
}