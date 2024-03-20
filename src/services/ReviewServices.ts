
import Ireviewpage from "../interfaces/Ireview";
import reviewpageModel from '../model/schema/ReviewSchema' ;
import ReviewSchema from "../model/schema/ReviewSchema";
import reviewSchema from "../model/schema/ReviewSchema";


 export class ReviewService {
    async createReview(reviewData: Ireviewpage): Promise<Ireviewpage> {
        try {
            const review = await reviewSchema.create(reviewData);
            return review;
        } catch (error) {
            throw new Error(`Could not create review: ${error}`);
        }
    }

    async getReviewById(id: string): Promise<Ireviewpage[]> {
        try {
            return await ReviewSchema.find({bookId: id});
        } catch (error) {
            throw new Error(`Could not fetch review: ${error}`);
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
