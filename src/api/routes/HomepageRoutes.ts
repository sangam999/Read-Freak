import express, {Request, Response, Router} from 'express';
import { HomepageServices } from '../../services/HomepageServices';
export default (app: Router) => {
    const homepageServices = new HomepageServices();

// Route to get the homepage
    app.get('/homepage', async (req: Request, res: Response) => {
        try {
            // const recentlyViewed: IBooksPage[] = req.body.recentlyViewed;
            const userId = req.params.userId;
            const homepage = await homepageServices.getHomepage(userId);

            res.send(homepage);
        } catch (err) {
            res.json({message: (err as Error).message});
        }
    });

}


/*/app.get('/recent-activities/:id', async (req: Request, res: Response) => {
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

 */
