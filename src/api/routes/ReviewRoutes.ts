import express, {Request, Response, Router} from 'express';

import Ireviewpage from "../../interfaces/Ireview";
import bodyParser from "body-parser";
import {ReviewService} from "../../services/ReviewServices";
import {auth} from "../middlewear/Auth";

export default (app: Router) => {
    const reviewService = new ReviewService();

// Create a new review
    app.post('/createreview',auth, async (req: Request, res: Response) => {
        try {
            const reviewData: Ireviewpage = req.body;
            const newReview = await reviewService.createReview(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    });

// Get review by ID
    app.get('/getreview/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const review = await reviewService.getReviewById(id);
            if (!review) {
                res.status(404).json({message: 'Review not found'});
                return;
            }
            res.json(review);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    });

    app.get('/getreviews/:bookId', async (req: Request, res: Response) => {
        try {
            const bookId = req.params.bookId;
            const review = await reviewService.getReviews(bookId);
            if (!review) {
                res.status(404).json({message: 'Review not found'});
                return;
            }
            res.json(review);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    });




// Delete review
    app.delete('/deleteReview/:id',auth, async (req: Request, res: Response) => {
        const { _id } = req.params;
        try {
            await reviewService.deletereview(_id);
            return res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error("Error deleting review:", error);
            return res.status(500).json( "error in deleteing review" );
        }
    });
};
