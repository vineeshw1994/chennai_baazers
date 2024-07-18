import express from "express";
import { filter_products, search_products } from "../controllers/searchController.js";

const route = express.Router();

route.get("/search-products", search_products);
route.get('/filter-products',filter_products)

export default route;
