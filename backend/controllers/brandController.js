import {
  addBrand,
  brands,
  brands_all,
  editBrand,
  editBrand_Image,
  getBrandById,
} from "../models/brandModel.js";
import { getDataUri } from "../utils/features.js";

export const createBrand = async (req, res, next) => {
  try {
    console.log("ths is the brand create function");
    const { name, description, activity } = req.body;
    console.log(req.body);
    const brandName = name.toLowerCase();
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = getDataUri(req.file);
    const data = await addBrand(brandName, description, activity, file);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    } else {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to fetch brands with pagination
export const getBrand = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Default limit of brands per page (adjust as per your requirement)

  try {
    const data = await brands(page, limit);
    if (data.success) {
      return res.status(200).json({
        success: true,
        brand: data.brand,
        message: data.message,
      });
    } else {
      return res.status(404).json({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};
export const all_brands = async (req, res, next) => {
  try {
    const data = await brands_all();
    if (data.success) {
      return res.status(200).json({
        success: true,
        brand: data.brand,
        message: data.message,
      });
    } else {
      return res.status(404).json({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const brandEdit = async (req, res, next) => {
  console.log("this is the brand edit function");
  try {
    const { id } = req.params;
    const { name, description, activity } = req.body;
    console.log(req.body, id);
    if (
      !name ||
      name === "" ||
      !description ||
      description === "" ||
      !activity ||
      activity === ""
    ) {
      return res
        .status(400)
        .json({ message: "Required all fields ", success: false });
    }
    const brandName = name.toLowerCase();

    const data = await editBrand(id, brandName, description, activity);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const brandImageEdit = async (req, res, next) => {
  console.log("this is the brand image update controller");
  try {
    const { id } = req.params;
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }
    const file = getDataUri(req.file);
    const data = await editBrand_Image(id, file);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const singleBrand = async (req, res, next) => {
  console.log("this is the single brand controller ");
  try {
    const { id } = req.params;
    console.log(typeof id, id);
    const data = await getBrandById(id);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        brand: data.brand,
      });
    } else {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};
