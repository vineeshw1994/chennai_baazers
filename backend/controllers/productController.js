import {
  createProduct,
  deleteProduct,
  get_products,
  product,
  product_image_update,
  product_published,
  product_update,
  products_all,
  single_product,
} from "../models/productModel.js";
import { getDataUris } from "../utils/features.js";

export const addProduct = async (req, res, next) => {
  console.log("this is the product add function");
  try {
    console.log("one");
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload an image", success: false });
    }
    const {
      product_name,
      description,
      price,
      stock,
      sku,
      code,
      size,
      color,
      discount,
      start_date,
      end_date,
      units,
      product_status,
      sub_cateId,
      discount_status,
    } = req.body;
    let product_price = parseFloat(price);
    let product_stock = parseInt(stock, 10);
    let product_discount = discount ? parseInt(discount, 10) : null;
    let product_code = code ? parseInt(code, 10) : null;
    let product_sku = sku ? parseInt(sku, 10) : null;
    let cateId = parseInt(sub_cateId);
    let product_start_date = start_date ? new Date(start_date) : null;
    let product_end_date = end_date ? new Date(end_date) : null;

    console.log("two");

    console.log(req.body);
    const dataUris = req.files.map((file) => getDataUris(file));
    let realprice = 0;
    if (discount) {
      realprice = product_price - (product_price * product_discount) / 100;
    }
    if (!discount || discount === "") {
      product_discount = 0;
    }
    console.log(typeof realprice);
    console.log('three')
    const data = await createProduct(
      product_name,
      description,
      product_price,
      realprice,
      product_stock,
      product_sku,
      product_code,
      size || null,
      color || null,
      product_discount,
      product_start_date,
      product_end_date,
      units,
      product_status,
      discount_status,
      cateId,
      dataUris
    );
    console.log(data, "this is data from created product response");
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
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

export const products = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const data = await get_products(page, limit);
    if (data.success) {
      return res.status(200).json({
        products: data.products,
        success: data.success,
        message: data.message,
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
export const all_products = async (req, res, next) => {
  try {
  
    const data = await products_all();
    if (data.success) {
      return res.status(200).json({
        products: data.products,
        success: data.success,
        message: data.message,
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

export const update_product = async (req, res, next) => {
  try {
    console.log(req.body, "<-------------------");
    const { proId } = req.params;
    const {
      product_name,
      price,
      description,
      discount,
      sub_cateId,
      product_status,
      stock,
      size,
      color,
      units,
      start_date,
      end_date,
      sku,
      code,
    } = req.body;

    const product_price = parseFloat(price);
    const product_stock = parseInt(stock, 10);
    const product_discount = discount ? parseInt(discount, 10) : null;
    const product_code = code ? parseInt(code, 10) : null;
    const product_sku = sku ? parseInt(sku, 10) : null;
    const cateId = parseInt(sub_cateId);
    const product_start_date = start_date ? new Date(start_date) : null;
    const product_end_date = end_date ? new Date(end_date) : null;
    const product_size = size ? size : null;
    const product_color = color ? color : null;

    let realprice = 0;
    if (discount) {
      realprice = product_price - (product_price * product_discount) / 100;
    }
    if (!discount || discount === "") {
      product_discount = 0;
    }
    console.log(typeof realprice);
    // return res.json({ success: true, message: "updated successfully" });
    const data = await product_update(
      product_name,
      description,
      product_price,
      realprice,
      product_stock,
      product_discount,
      product_start_date,
      product_end_date,
      product_status,
      product_code,
      product_sku,
      product_size,
      product_color,
      units,
      cateId,
      proId
    );

    if (data.success) {
      return res.status(200).json({
        success: data.success,
        product: data.product,
        message: data.message,
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

export const update_product_image = async (req, res, next) => {
  try {
    const { proId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload an image", success: false });
    }
    const dataUris = req.files.map((file) => getDataUris(file));

    const data = await product_image_update(proId, dataUris);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const published_product = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { published } = req.body;
    console.log(published, proId);
    const id = parseInt(proId);
    const data = await product_published(id, published);
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

export const get_single_product = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const data = await single_product(proId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        product: data.product,
      });
    }
    if (!data.success) {
      return { success: data.success, message: data.message };
    }
  } catch (error) {
    next(error);
  }
};
export const shop_product = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const data = await product(proId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        product: data.product,
      });
    }
    if (!data.success) {
      return { success: data.success, message: data.message };
    }
  } catch (error) {
    next(error);
  }
};

export const productDelete = async (req, res, next) => {
  console.log("this is the product delte controller");
  try {
    const { proId } = req.params;
    const data = await deleteProduct(proId);
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
