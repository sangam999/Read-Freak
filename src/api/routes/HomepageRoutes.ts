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


