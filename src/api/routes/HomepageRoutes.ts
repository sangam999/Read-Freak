import express, {Request, Response, Router} from "express";
import { HomepageService } from "../../services/HomepageServices";
import {homepage} from "../response/homepage";
import HomePage from "../../model/schema/HomePage";

export default (app: Router) => {


// Get all homepage entries
    app.get("/getHomepageEntries/:id", async (req: Request, res: Response) => {
        try {
            const allHomepageEntries = await HomepageService.getAllHomepageEntries();
            res.json(allHomepageEntries);
        } catch (error) {
            res.status(500).json({error: "Could not retrieve homepage entries"});
        }
    });







}
