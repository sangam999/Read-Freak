import { Router } from "express"
import booksroutes from "./routes/Booksroutes";

export default () => {
    const app = Router();

    booksroutes(app);



    return app;
}