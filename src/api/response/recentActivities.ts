export class recentActivities {
    bookId: string;
    reviewId:string;
    user_Id:string;
    bookreview: string;
   booktitle: string;
    bookauthor: string;



    constructor(
        bookId: string,
        reviewId: string,
        user_Id:string,
        bookreview:string,
        booktitle: string,
        bookauthor: string,
    )

    {
        this.bookId = bookId;
        this.reviewId = reviewId;
        this.user_Id = user_Id;
        this.bookreview = bookreview;
        this.booktitle=booktitle;
        this.bookauthor=bookauthor;

    }
}