import express from "express";
import { create_navbanner, get_navbanner } from "../controllers/bannerController.js";
import { singleUpload } from "../middlewares/multer.js";

const route = express.Router();

route.post("/nav-banner", singleUpload, create_navbanner);
route.get('/get-nav-banner',get_navbanner)

export default route;
