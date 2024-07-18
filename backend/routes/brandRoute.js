import express from "express";
import {
  all_brands,
  brandEdit,
  brandImageEdit,
  createBrand,
  getBrand,
  singleBrand,
} from "../controllers/brandController.js";
import { singleUpload } from "../middlewares/multer.js";

const route = express.Router();

// BASE BRAND ROUTES
route.post("/create-brand", singleUpload, createBrand);
route.put("/update-brand/:id", brandEdit);
route.put("/update-brand-image/:id",singleUpload, brandImageEdit);
route.get("/brands", getBrand);
route.get("/single-brand/:id", singleBrand);
route.get('/all-brands', all_brands)

export default route;
