export class recentActivities {
    bookId: string;
    reviewId:string;
    username:string;
    review: string;
    reviewBy: string;
    reviewDate: string;



    constructor(
        bookId: string,
        reviewId: string,
        username:string,
        review:string,
        reviewBy: string,
        reviewDate: string,
    )

    {
        this.bookId = bookId;
        this.reviewId = reviewId;
        this.username = username;
        this.review = review;
        this.reviewBy=reviewBy;
        this.reviewDate=reviewDate;

    }
}