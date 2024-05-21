import  { Router, Request, Response } from 'express';
import {wishlistsServices} from '../../services/wishlistsServices';
import wishListsModel from "../../model/schema/WishLists";
import wishLists from "../../model/schema/WishLists";
import WishLists from "../../model/schema/WishLists";
import {auth} from "../middlewear/Auth"; // Importing wishListsModel
// Remove redundant import: import wishLists from "../../model/schema/WishLists";

export default (app: Router) => {
    const wishlists = new wishlistsServices();

    // Endpoint to get wishlist by user ID
    app.get('/wishlist/:userId', async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;

            // Retrieve the user's wishlist
            const wishlist = await wishlists.getWishListById(userId);

            if (!wishlist) {
                return res.status(404).json({error: 'Wishlist not found for the user ID'});
            }

            res.json(wishlist);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            res.status(500).json({error: 'Failed to fetch wishlist items'});
        }
    });


    // Endpoint to add a wishlist item
    app.get('/addwishlist/:bookId', auth, async (req, res) => {
        try {

            // Call the addWishList function with provided data and wishListsModel
            await wishlists.addWishList(req.params.bookId, req.user._id);

            // Respond with success message
            res.status(200).json({message: "Wishlist added successfully"});
        } catch (error) {
            // If an error occurs, respond with an error message
            console.error("Error adding wishlist:", error);
            res.status(500).json({error: "Failed to add wishlist"});
        }
    });

    app.delete('/removewishlist/:bookId', auth, async (req, res) => {
        try {

            // Call the removeWishlist function with provided data
            await wishlists.removeWishlist(req.params.bookId, req.user._id);

            // Respond with success message
            res.status(200).json({message: 'Book removed from wishlist'});
        } catch (error) {
            // If an error occurs, respond with an error message
            console.error('Error removing book from wishlist:', error);
            res.status(500).json({message: 'Failed to remove book from wishlist'});
        }
    });
}
