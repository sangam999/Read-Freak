import express, { Request, Response } from 'express';
import ReviewServices from "../../services/ReviewServices";
import Ireviewpage from "../../interfaces/Ireview";

const router = express.Router();

// Create a new review
router.post('/', async (req: Request, res: Response) => {
    try {
        const reviewData: Ireviewpage = req.body;
        const newReview = await ReviewServices.createReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// Get review by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const review = await ReviewServices.getReviewById(reviewId);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(review);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// Update review
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const updatedData: Partial<Ireviewpage> = req.body;
        const updatedReview = await ReviewServices.updateReview(reviewId, updatedData);
        if (!updatedReview) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(updatedReview);
    } catch (error) {

        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// Delete review
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        await ReviewServices.deleteReview(reviewId);
        res.status(204).end();
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

export default router;
