export class wishLists {

    bookid: string;
    username: string;
    title:string;
    author:string;
    genre: string;


    constructor(
        bookid: string,
        username: string,
        title: string,
        author: string,
        genre:string,


    )

    {


        this.bookid =bookid;
        this.username =username;
        this.title=title;
        this.author=author;
        this.genre=genre;
    }
}
