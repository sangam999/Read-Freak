import Ireviewpage from "../../interfaces/Ireview";

const baseUrl = "http://localhost:3000/";
const endpoint = "deletereview";

export class Review {
    _id?:string;
    bookid: string;
    rating: string;
    reviewText:string;
    reviewBy:string;
    reviewDate:string;
    delete:string;

    constructor(
        review: Ireviewpage
    )    {

        this._id= review._id
        this.bookid =review.bookId;
        this.rating =review.rating;
        this.reviewText=review.reviewText;
        this.reviewBy=review.reviewBy;
        this.reviewDate=review.reviewDate;
        this.delete= baseUrl+endpoint+review._id;
    }
}

class Button {
    type: string;
    link: string;

    constructor(
        type:string,
        link:string
    ) {
        this.type=type;
        this.link=link;
    }
}

export class WriteReview{
    text: string;
    link:string;
    button?:Button

    constructor(
        text: string,
        link:string,
        button?: Button
    ) {
        this.text = text;
        this.link = link;
        this.button = button;
    }
}



export class ReviewSection{
    review:Review[];
    writeReview: WriteReview;

    constructor(
        review: Review[],
        writeReview: WriteReview
    ) {
        this.review=review;
        this.writeReview=writeReview;
    }

}