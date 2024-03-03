
import Ireviewpage from "../interfaces/Ireview";
import reviewpageModel from '../model/schema/ReviewSchema' ;
import ReviewSchema from "../model/schema/ReviewSchema";
import reviewSchema from "../model/schema/ReviewSchema";


class ReviewService {
    async createReview(reviewData: Ireviewpage): Promise<Ireviewpage> {
        try {
            const review = await reviewSchema.create(reviewData);
            return review;
        } catch (error) {
            throw new Error(`Could not create review: ${error}`);
        }
    }

    async getReviewById(reviewId: string): Promise<Ireviewpage| null> {
        try {
            const review = await ReviewSchema.findById(reviewId);
            return review;
        } catch (error) {
            throw new Error(`Could not fetch review: ${error}`);
        }
    }

    async updateReview(reviewId: string, updatedData: Partial<Ireviewpage>): Promise<Ireviewpage | null> {
        try {
            const review = await reviewSchema.findByIdAndUpdate(reviewId, updatedData, { new: true });
            return review;
        } catch (error) {
            throw new Error(`Could not update review: ${error}`);
        }
    }

    async deleteReview(reviewId: string): Promise<void> {
        try {
            await ReviewSchema.deleteOne({ _id: reviewId });
        } catch (error) {
            throw new Error(`Could not delete review: ${error}`);
        }
    }

    async getReviewsByUserId(userId: string): Promise<Ireviewpage[]> {
        try {
            const reviews = await reviewSchema.find({ user_id: userId });
            return reviews;
        } catch (error) {
            throw new Error(`Could not fetch reviews: ${error}`);
        }
    }

    // Add more methods as needed for fetching reviews by book ID, filtering, etc.
}

export default new ReviewService();
