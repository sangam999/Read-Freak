
import Ireviewpage from "../interfaces/Ireview";
import reviewpageModel from '../model/schema/ReviewSchema' ;
import ReviewSchema from "../model/schema/ReviewSchema";
import reviewSchema from "../model/schema/ReviewSchema";
import {Review, ReviewSection, WriteReview} from "../api/response/Review";
import {Book} from "../api/response/Booksresponse";



 export class ReviewService {
    async createReview(reviewData: Ireviewpage) {
        try {
            const review = await reviewSchema.insertMany([reviewData]);
            return review;
        } catch (error) {
            throw new Error(`Could not create review: ${error}`);
        }
    }

     async getReviewById(bookid: string): Promise<ReviewSection> {
         try {
             const reviewData: Ireviewpage[] = await ReviewSchema.find({ bookId:bookid });
             const writeReview: WriteReview = new WriteReview('writeReview',
                 'http://localhost:3000/createreview',
             )

             const reviews: Review[] = [];

             for (const review of reviewData) {
                 reviews.push(new Review(review));
             }

             const response: ReviewSection = new ReviewSection(reviews,writeReview);

             return response
         } catch (err) {
             throw new Error((err as Error).message);
         }
     }




     async deleteReview(id: string) {
        try {
            await ReviewSchema.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Could not delete review: ${error}`);
        }
    }

    //async getReviewsByUserId(userId: string): Promise<Ireviewpage[]> {
       // try {
           // const reviews = await reviewSchema.find({ user_id: userId });
           // return reviews;
      //  } catch (error) {
          //  throw new Error(`Could not fetch reviews: ${error}`);
        //}
   // }


    // Add more methods as needed for fetching reviews by book ID, filtering, etc.

 }
export default ReviewService;
