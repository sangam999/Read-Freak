import express from "express";
import config from "./config/config";
import { db } from "./dbloaders/dbConnect"

async function startServer() {
    const app = express();
    //connect to the database
    try {
        db();
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }

}
startServer();