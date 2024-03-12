import express, { Request, Response, Router } from 'express';
import { HomepageServices } from '../../services/HomepageServices';

export default (app: Router) => {
    const homepageServices = new HomepageServices();

    app.get('/homepage', async (req: Request, res: Response) => {
        try {
            const {banner, recommendation, wishLists, recentActivities} = req.query;
            const homepageData = await homepageServices.getHomepage(banner, recommendation, wishLists, recentActivities);
            res.json(homepageData);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({error: error.message});
        }
    });

    app.get('/recommendation', async (req: Request, res: Response) => {
        try {
            // Assuming recentlyViewed is passed as a query parameter
            const {recentlyViewed} = req.query;
            const recommendationData = await homepageServices.recommendation(recentlyViewed);
            res.json(recommendationData);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({error: error.message});
        }
    });

    app.get('/wishlists', async (req: Request, res: Response) => {
        try {
            // Assuming userId is passed as a query parameter
            const {userId} = req.query;
            const wishListsData = await homepageServices.wishLists(userId);
            res.json(wishListsData);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

    app.get('/banner', async (req: Request, res: Response) => {
        try {
            const bannerData = await homepageServices.banner();
            res.json(bannerData);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({error: error.message});
        }
    });

    app.get('/recent-activities', async (req: Request, res: Response) => {
        try {
            // Assuming userId is passed as a query parameter
            const {userId} = req.query;
            const recentActivitiesData = await homepageServices.recentActivities(userId);
            res.json(recentActivitiesData);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({error: error.message});
        }
    });

}
