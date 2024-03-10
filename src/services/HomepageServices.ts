import { Request, Response } from 'express';
import  {recommendation} from '../api/response/recommendation';
import {wishLists} from '../api/response/wishLists';
import {recentActivities} from '../api/response/recentActivities';
import {banner} from '../api/response/banner';
import homePage from "../model/schema/HomePage";
import {Homepage} from "../api/response/homepage";

async function getHomepage(req: Request, res: Response): Promise<void> {
    try {
        // Fetch recommendations
        const recommendations = await recommendation.getRecommendations();


        // Fetch wishlists
        // @ts-ignore
        const wishLists: any = await wishLists.wishLists();

        // Fetch recent activities
        // @ts-ignore
        const recentActivities: any = await recentActivities.recentActivities({});

        // Fetch banners
        const banners = await banner.getbanners();

        // Assemble the data to send in the response
        const homepage = {
            recommendations,
            wishLists,
            recentActivities,
            banners,
        };

        // Send the response
        res.status(200).json(homepage);
    } catch (error) {
        // Handle errors
        console.error('Error fetching homepage data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Export the function
export default getHomepage;
