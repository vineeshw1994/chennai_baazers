import express from "express";
import {
  allCategories,
  all_subcategories,
  categoryEdit,
  categoryImageEdit,
  createCategory,
  create_subcategory,
  edit_subCategory,
  getCategory,
  get_subcategories,
  singleCategory,
  singleSubCategory,
  subCate_Image_Edit,
} from "../controllers/categoryController.js";
import { singleUpload } from "../middlewares/multer.js";

const route = express.Router();

// BASE CATEGORY ROUTES
route.post("/create-category", singleUpload, createCategory); 
route.put("/update-category-image/:id", singleUpload, categoryImageEdit);
route.put("/update-category/:id", singleUpload, categoryEdit);
route.get("/categories", getCategory);
route.get("/singleCate/:id", singleCategory);
route.get('/all-categories',allCategories)

// SUB CATEGORIES ROUTES
route.post("/create-sub-category", singleUpload, create_subcategory);
route.put("/update-sub-category/:cateId", edit_subCategory);
route.put("/update-sub-category-image/:cateId", singleUpload, subCate_Image_Edit);
route.get("/sub-category", get_subcategories); 
route.get("/single-subcate/:id", singleSubCategory);
route.get('/all-subcategories',all_subcategories)


export default route;
