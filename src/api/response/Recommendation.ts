import IBooksPage from "../../interfaces/IBooksPage";

export class Recommendation {
    title: string;
    author:string;
    genre:string;
    constructor(
        book: IBooksPage
    ) {
        this.title = book.title;
        this.author = book.author;
        this.genre = book.genre;

    }
}