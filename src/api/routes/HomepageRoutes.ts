import express, {Request, Response, Router} from "express";

import {Homepage} from "../response/homepage";
import HomePage from "../../model/schema/HomePage";
import {HomepageServices} from "../../services/HomepageServices";

export default (app: Router) => {

    const homePageService = new HomepageServices();

// Get all homepage entries
    app.get("/getHomepage", async (req: Request, res: Response) => {
        try {
            const allHomepageEntries = await homePageService.getHomepage();
            res.json(allHomepageEntries);
        } catch (error) {
            res.status(500).json({error: "Could not retrieve homepage entries"});
        }
    });







}
