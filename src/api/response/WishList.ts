export class WishList {

    bookid: string;
    user_Id: string;
    title:string;
    author:string;
    genre: string;


    constructor(

        bookid: string,
        user_Id: string,
        title: string,
        author: string,
        genre:string,


    )

    {


        this.bookid =bookid;
        this.user_Id =user_Id;
        this.title=title;
        this.author=author;
        this.genre=genre;
    }
}
