import express from "express";
import userRoute from "./userRoute.js";
import categoryRoute from "./categoryRoute.js";
import productRoute from "./productRoute.js";
import cartRoute from "./cartRoute.js";
import wishlistRoute from "./whishlistRoute.js";
import orderRoute from "./orderRoute.js";
import brandRoute from "./brandRoute.js";

const router = express.Router();

// USER ROUTES
router.use("/user", userRoute);

// CATEGORY ROUTES
router.use("/category", categoryRoute);

// PRODUCT ROUTES
router.use("/product", productRoute);

// CART ROUTES
router.use("/cart", cartRoute);

// WISH LIST ROUTES
router.use("/wishlist", wishlistRoute);

// ORDER ROUTES
router.use("/order", orderRoute);

//BRAND ROUTES
router.use("/brand", brandRoute);

export default router;
