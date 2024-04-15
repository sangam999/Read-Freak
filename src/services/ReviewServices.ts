
import Ireviewpage from "../interfaces/Ireview";
import reviewpageModel from '../model/schema/ReviewSchema' ;
import ReviewSchema from "../model/schema/ReviewSchema";
import reviewSchema from "../model/schema/ReviewSchema";
import {Review, ReviewSection, WriteReview} from "../api/response/Review";
import {Book} from "../api/response/Booksresponse";
import {Schema} from "mongoose";
import {ObjectId} from "mongodb"
import booksModel from "../model/schema/BooksSchema";




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

     async getallReviews(id: string): Promise<ReviewSection> {
         try {
             const reviewData: Ireviewpage[] = await ReviewSchema.find({id:id});

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
     async deleteReview(id:string) {
         try {
             const deletedReview = await reviewSchema.findByIdAndDelete(id);
             if (!deletedReview) {
                 throw new Error("Review not found");
             }
             return "Review deleted successfully";
         } catch (error) {
             throw new Error(`Error deleting review: ${error}`);
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



