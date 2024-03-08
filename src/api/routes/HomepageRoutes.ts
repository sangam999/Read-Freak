import express, {Request, Response, Router} from "express";
import { HomepageService } from "../../services/HomepageServices";
import {Homepage} from "../response/homepage";
import HomePage from "../../model/schema/HomePage";

export default (app: Router) => {

    const homePageService = new HomepageService();

// Get all homepage entries
    app.get("/getHomepage", async (req: Request, res: Response) => {
        try {
            const allHomepageEntries = await homePageService.getAllHomepageEntries();
            res.json(allHomepageEntries);
        } catch (error) {
            res.status(500).json({error: "Could not retrieve homepage entries"});
        }
    });







}
