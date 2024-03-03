import express, { Request, Response } from "express";
import { HomepageService } from "../../services/HomepageServices";
import {homepage} from "../response/homepage";
import HomePage from "../../model/schema/HomePage";

const router = express.Router();

// Create a homepage entry
router.post("/", async (req: Request, res: Response) => {
    try {
        const homepageData: homepage = req.body;
        const newHomepageEntry = await HomepageService.createHomepage(homepageData);
        res.json(newHomepageEntry);
    } catch (error) {
        res.status(500).json({ error: "Could not create homepage entry" });
    }
});

// Get all homepage entries
router.get("/", async (req: Request, res: Response) => {
    try {
        const allHomepageEntries = await HomepageService.getAllHomepageEntries();
        res.json(allHomepageEntries);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve homepage entries" });
    }
});

// Get a single homepage entry by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const homepageId = req.params.id;
        const homepageEntry = await HomepageService.getHomepageEntryById(homepageId);
        if (homepageEntry) {
            res.json(homepageEntry);
        } else {
            res.status(404).json({ error: "Homepage entry not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve homepage entry" });
    }
});

// Update a homepage entry
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const homepageId = req.params.id;
        const updatedHomepageData: Partial<homepage> = req.body;
        const updatedHomepageEntry = await HomepageService.updateHomepageEntry(homepageId, updatedHomepageData);
        if (updatedHomepageEntry) {
            res.json(updatedHomepageEntry);
        } else {
            res.status(404).json({ error: "Homepage entry not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Could not update homepage entry" });
    }
});

// Delete a homepage entry
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const homepageId = req.params.id;
        await HomepageService.deleteHomepageEntry(homepageId);
        res.json({ message: "Homepage entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Could not delete homepage entry" });
    }
});

export default router;
