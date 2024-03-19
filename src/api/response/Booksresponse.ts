import
    IBooksPage from "../../interfaces/IBooksPage";
import {Review} from "./Review";

export class Book {


    title: string;
    author: string;
    year: number;
    genre: string;
    writeReview?: string;
    reviews?: Review[];

    constructor( book: IBooksPage) {

        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
        this.reviews = [];

    }
}