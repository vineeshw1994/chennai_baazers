import express from "express";
import {
  add_to_whishlist,
  get_whishlist,
  remove_whishlist,
} from "../controllers/whishlistController.js";

const route = express.Router(); 

// ADD TO WISH LIST
route.post("/add-wishlist/:proId",add_to_whishlist );

// GET CART ITEMS
route.get("/get-wishlist/:userId", get_whishlist);

// REMOVE wishlist ITEMS
route.delete("/remove-wishlist/:proId", remove_whishlist);

export default route;
