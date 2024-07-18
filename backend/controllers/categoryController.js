import {
  all_categories,
  categories,
  createCat,
  editCategory,
  editCategoryImage,
  getCategoryById,
} from "../models/categoryModel.js";
import {
  subcategory_create,
  subcategory_edit,
  subcategories,
  getSubCategoryById,
  edit_subcate_image,
  subcategories_all,
} from "../models/subCategoryModel.js";
import { getDataUri } from "../utils/features.js";

// BASE CATEGORY CREATE
export const createCategory = async (req, res, next) => {
  try {
    console.log("ths is the category add function");
    const { name, description } = req.body;
    const catName = name.toLowerCase().trim();
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = getDataUri(req.file);
    const data = await createCat(catName, description, file);
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

// BASE CATEGORY EDIT
export const categoryImageEdit = async (req, res, next) => {
  console.log("this is the category image edit function");
  try {
    const { id } = req.params;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }
    const file = getDataUri(req.file);
    console.log("one");
    const data = await editCategoryImage(id, file);
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
export const categoryEdit = async (req, res, next) => {
  console.log("this is the category edit function");
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(name, description);
    console.log(req.body);
    if (!name || name === "" || !description || description === "") {
      return res
        .status(400)
        .json({ message: "Required all fields ", success: false });
    }
    const catName = name.toLowerCase();

    console.log("one");
    const data = await editCategory(id, catName, description);
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

// BASE CATEGORY GET
export const getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const data = await categories(page, limit);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        category: data.category,
        message: data.message,
      });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const allCategories = async (req, res, next) => {
  try {
   
    const data = await all_categories();
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        category: data.category,
        message: data.message,
      });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

// SINGLE CATEGORY
export const singleCategory = async (req, res, next) => {
  console.log("this is the single category function ");
  try {
    const { id } = req.params;
    console.log(typeof id, id);
    const data = await getCategoryById(id);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        category: data.category,
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

// SUB CATEGORY CREATE

export const create_subcategory = async (req, res, next) => {
  try {
    const { name, description, brand, baseCateId } = req.body;
    console.log(req.body);
    const cateId = parseInt(baseCateId);

    const subCateName = name.toLowerCase();
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = getDataUri(req.file);

    const data = await subcategory_create(
      subCateName,
      description,
      brand,
      cateId,
      file
    );
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

export const edit_subCategory = async (req, res, next) => {
  console.log("this is the subcategories controller");
  try {
    console.log(req.body);
    const { cateId } = req.params;
    const { name, description, brand, baseCateId } = req.body;
    const data = await subcategory_edit(name, description, brand, baseCateId, cateId);
    if (data.success) {
      return res.status(200).json({
        message: data.message,
        success: data.success,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const subCate_Image_Edit = async (req, res, next) => {
  try {
    console.log("this is the sub category image edit controller");
    const { cateId } = req.params;
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }
    const file = getDataUri(req.file);
    const data = await edit_subcate_image(cateId, file);
    if (data.success) {
      return res
        .status(200)
        .json({ message: data.message, success: data.success });
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

export const get_subcategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const data = await subcategories(page, limit);
    if (data.success) {
      return res.status(200).json({
        category: data.category,
        message: data.message,
        success: data.success,
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
export const all_subcategories = async (req, res, next) => {
  try {
   
    const data = await subcategories_all();
    if (data.success) {
      return res.status(200).json({
        category: data.category,
        message: data.message,
        success: data.success,
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

// SINGLE CATEGORY
export const singleSubCategory = async (req, res, next) => {
  console.log("this is the single category function ");
  try {
    const { id } = req.params;
    console.log(typeof id, id);
    const data = await getSubCategoryById(id);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        category: data.category,
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
