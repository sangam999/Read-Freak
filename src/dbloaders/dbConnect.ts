import mongoose from "mongoose";
import config from "../config/config";


const DB_URL: string = config.DB_URL || "mongodb://localhost:27017/"
export async function db() {
    mongoose
        .connect(DB_URL)
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((error) => {
            console.error(`Error connecting to the database: ${error}`);
        });
}


