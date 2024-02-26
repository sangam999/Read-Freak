
export class booklists {
    book_id?: string;
    tittle: string;
    summary: string;
    genre: string;
    author:string;
    review:string;
    date: string;
    constructor(
        tittle: string,
        summary: string,
        genre: string,
        author:string,
        review:string,
        date: string,
        book_id?:string,
     )    {

        this.book_id =book_id;
        this.tittle =tittle;
        this.summary = summary;
        this.genre =genre;
        this.author=author;
        this.review=review;
        this.date=date;
}
}