import mongoose from "mongoose";
import config from "../config/config";


const DB_URL: string = config.DB_URL || "mongodb://127.0.0.1:27017/local"
export async function db() {
    return (await mongoose.connect(DB_URL)).connection
}





