import express from "express";
import {
  brandEdit,
  createBrand,
  getBrand,
  singleBrand,
} from "../controllers/brandController.js";
import { singleUpload } from "../middlewares/multer.js";

const route = express.Router();

// BASE BRAND ROUTES
route.post("/create-brand", singleUpload, createBrand);
route.put("/update-brand/:id", brandEdit);
route.get("/brands", getBrand);
route.get("/singleBrand/:id", singleBrand);

export default route;
