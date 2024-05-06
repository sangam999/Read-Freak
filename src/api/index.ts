import { Router } from "express"
import booksroutes from "./routes/Booksroutes";
import reviewRoutes from "./routes/ReviewRoutes";
import userRoutes from "./routes/userRoutes";
import HomepageRoutes from "./routes/HomepageRoutes";
import adminRoutes from "./routes/adminRoutes";
import addWishlist from "./routes/Wishlists";
import Wishlists from "./routes/Wishlists";

export default () => {
    const app = Router();

    booksroutes(app);
    reviewRoutes(app);
    userRoutes(app);
    HomepageRoutes(app);
    adminRoutes(app);
    Wishlists(app)



    return app;
}