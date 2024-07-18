import {
  addBrand,
  brands,
  editBrand,
  getBrandById,
} from "../models/brandModel.js";
import {getDataUri} from '../utils/features.js'

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

export const getBrand = async (req, res, next) => {
  try {
    const data = await brands();
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        brand: data.brand,
        message: data.message,
      });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const brandEdit = async (req, res, next) => {
  console.log("this is the brand edit function");
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(req.body);
    if (!name || name === "" || !description || description === "") {
      return res
        .status(400)
        .json({ message: "Required all fields ", success: false });
    }
    const catName = name.toLowerCase();
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: falseF });
    }
    const file = getDataUri(req.file);

    const data = await editBrand(id, catName, description, file);
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
  console.log("this is the single brand function ");
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
