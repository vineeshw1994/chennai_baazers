import express from "express";
import {
  addCart,
  get_cart,
  reduce_quantity,
  remove_cart,
  update_quantity,
} from "../controllers/cartController.js";
 
const route = express.Router();

// ADD TO CART
route.post("/add-cart/:proId", addCart);

// GET CART ITEMS
route.get("/get-cart/:userId", get_cart);

// REMOVE CART ITEMS
route.delete("/remove-cart/:proId", remove_cart);

// UPDATE CART PRODUCT QUANTITY
route.post("/update-quantity/:proId", update_quantity);

// REDUCE CART PRODUCT QUANTITY
route.post("/reduce-quantity/:proId", reduce_quantity);

export default route;
