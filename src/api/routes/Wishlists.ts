import  { Router, Request, Response } from 'express';
import { wishlistsServices } from '../../services/wishlistsServices';
import wishListsModel from "../../model/schema/WishLists";
import wishLists from "../../model/schema/WishLists";
import WishLists from "../../model/schema/WishLists";
import IWishLists from "../../interfaces/IWishLists"; // Importing wishListsModel
// Remove redundant import: import wishLists from "../../model/schema/WishLists";

export default (app: Router) => {
    const wishlists = new wishlistsServices();

    // Endpoint to get wishlist by user ID
    app.get('/wishlist/:id', async (req: Request, res: Response) => {
        try {
            const userId= req.params.userId;
            const wishlist = await wishlists.getWishListbyId(userId);

            if (!wishlist) {
                return res.status(404).json({ error: 'Wishlist not found for the user ID' });
            }

            res.json(wishlist);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            res.status(500).json({ error: 'Failed to fetch wishlist items' });
        }
    });

    // Endpoint to add a wishlist item
    app.post('/addwishlist', async (req: Request, res: Response) => {
        const { userId, bookId, title, author, genre } = req.body;

        try {
            const existingWishListItem = await wishListsModel.findOne({ userId, bookId });
            if (existingWishListItem) {
                return res.status(400).json({ error: 'Book already exists in the wishlist' });
            }

            // If the book does not exist, add it to the wishlist
            await wishlists.addWishList(userId, bookId, title, author, genre);
            res.status(201).json({ message: 'Wishlist item added successfully' });
        } catch (error) {
            console.error("Error adding wishlist item:", error);
            res.status(500).json({ error: 'Failed to add wishlist item' });
        }
    });
};
