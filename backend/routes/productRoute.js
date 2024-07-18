import express from "express";
import {
  addProduct,
  all_products,
  get_single_product,
  productDelete,
  products,
  published_product,
  shop_product,
  update_product,
  update_product_image,
} from "../controllers/productController.js";
import { multipleUpload } from "../middlewares/multiUpload.js";

const route = express.Router();

// CARETE PRODUCTS
route.post("/add-product", multipleUpload, addProduct);

// GET PRODUCTS
route.get("/get-products", products);

// get all products
route.get('/all-products',all_products)

//EDIT PRODUCTS
route.put("/update-product/:proId", update_product);

//product image update
route.put('/update-product-image/:proId',multipleUpload, update_product_image)

// PUBLISHED PRODUCT
route.put("/published/:proId", published_product);

// SINGLE PRODUCT
route.get("/single-product/:proId", get_single_product);
// SINGLE PRODUCT
route.get("/product/:proId", shop_product);

// DELTE PRODUCT
route.delete("/delete/:proId", productDelete);

export default route;
 