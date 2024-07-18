import { products, products_filter } from "../models/searchModel.js";

export const search_products = async (req, res, next) => {
  console.log("this is the search products controller");
  try {
    const { name } = req.query;
    const data = await products(name);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        products: data.products,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const filter_products = async (req, res, next) => {
  try {
    const { cateId, price, discount } = req.query;
    const data = await products_filter(cateId, price, discount);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message, products });
    }
  } catch (error) {
    next(error);
  }
};
