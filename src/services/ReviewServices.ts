import Ireviewpage from "../interfaces/Ireview";
import ReviewSchema from "../model/schema/ReviewSchema";
import reviewSchema from "../model/schema/ReviewSchema";
import {Review, ReviewSection, WriteReview} from "../api/response/Review";





 export class ReviewService {
     async createReview(reviewData: Ireviewpage) {
         try {
             const review = await reviewSchema.insertMany(reviewData);
             return review;
         } catch (error) {
             throw new Error(`Could not create review: ${error}`);
         }
     }

     async getReviewById(bookId: string): Promise<Review> {
         try {
             const reviewData: Ireviewpage | null = await ReviewSchema.findOne({bookId: bookId});

             if (!reviewData) {
                 throw new Error("Review not found");
             }

             const review: Review = new Review(reviewData);

             const writeReview: WriteReview = new WriteReview('writeReview', 'http://localhost:3000/createreview');

             const response: ReviewSection = new ReviewSection([review], writeReview);

             return review;
         } catch (err) {
             throw new Error((err as Error).message);
         }
     }

     async getallReviews(bookId: string): Promise<ReviewSection> {
         try {
             const reviewData: Ireviewpage[] = await ReviewSchema.find({bookId:bookId});

             if (!reviewData) {
                 throw new Error("Review not found");
             }

             const reviews: Review[] = []
             for (const reviewsInfo of reviewData) {
                 const review: Review = new Review(reviewsInfo);
                 reviews.push(review);
             }

             const writeReview: WriteReview = new WriteReview('writeReview', 'http://localhost:3000/createreview');

             const reviewSection: ReviewSection = new ReviewSection(reviews, writeReview);

             return reviewSection;
         } catch (err) {
             throw new Error((err as Error).message);
         }
     }

     async deletereview(id: string) {
         try {
             await reviewSchema.findByIdAndDelete(id);
             return {
                 message: "review deleted successfully"
             };
         } catch (error) {
             return {
                 message: "review  not found"
             };
         }
     }
 }










     //async deleteReview(id: string) {
     //  try {
     //  console.log("Deleting review with ID:", id);
     //   const review = await ReviewSchema.findById(id);

     //      if (!review) {
     //       throw new Error(`Review with ID ${id} not found`);
     //     }

     //   const deleted = await ReviewSchema.findByIdAndDelete(id);
     //    return deleted;
     //     } catch (error) {

     // @ts-ignore
     //  throw new Error(`Could not delete review: ${error.message}`);
     //    }
     //    }



