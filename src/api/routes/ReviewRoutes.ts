import express, {Request, Response, Router} from 'express';

import Ireviewpage from "../../interfaces/Ireview";
import bodyParser from "body-parser";
import ReviewServices from "../../services/ReviewServices";

export default (app: Router) => {
    const reviewService = new ReviewServices();

// Create a new review
    app.post('/createreview', async (req: Request, res: Response) => {
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

 //Update review
    app.post('/updateReview/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updatedData: Partial<Ireviewpage> = req.body;
            const updatedReview = await reviewService.updateReview(id, updatedData);
            if (!updatedReview) {
                res.status(404).json({message: 'Review not found'});
                return;
            }
            res.json(updatedReview);
        } catch (error) {

            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    })

// Delete review
    app.get('/deletereview/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await reviewService.deleteReview(id);
            res.status(200).json({message: "Deleted Successfully"});
        } catch (error) {
            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    });
}
