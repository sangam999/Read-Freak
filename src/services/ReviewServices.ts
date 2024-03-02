
import Ireviewpage from "../interfaces/Ireview";
import { ReviewModel, Review } from '../models/review';


class ReviewService {
    async createReview(reviewData: Review): Promise<Review> {
        try {
            const review = await Review.create(reviewData);
            return review;
        } catch (error) {
            throw new Error(`Could not create review: ${error}`);
        }
    }

    async getReviewById(reviewId: string): Promise<Review | null> {
        try {
            const review = await Review.findById(reviewId);
            return review;
        } catch (error) {
            throw new Error(`Could not fetch review: ${error}`);
        }
    }

    async updateReview(reviewId: string, updatedData: Partial<Review>): Promise<Review | null> {
        try {
            const review = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
            return review;
        } catch (error) {
            throw new Error(`Could not update review: ${error}`);
        }
    }

    async deleteReview(reviewId: string): Promise<void> {
        try {
            await ReviewModel.deleteOne({ _id: reviewId });
        } catch (error) {
            throw new Error(`Could not delete review: ${error}`);
        }
    }

    async getReviewsByUserId(userId: string): Promise<Review[]> {
        try {
            const reviews = await ReviewModel.find({ user_id: userId });
            return reviews;
        } catch (error) {
            throw new Error(`Could not fetch reviews: ${error}`);
        }
    }

    // Add more methods as needed for fetching reviews by book ID, filtering, etc.
}

export default new ReviewService();
