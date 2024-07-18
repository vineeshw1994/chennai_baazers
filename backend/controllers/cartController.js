import {
  add_to_cart,
  cart_item_remove,
  get_cart_items,
  quantity_reduce,
  quantity_update,
} from "../models/cartModel.js";

export const addCart = async (req, res, next) => {
  console.log("its add to cart controller");
  try {
    const { proId } = req.params;
    const { userId } = req.body;
    const productId = parseInt(proId);
    const data = await add_to_cart(productId, userId);
    console.log(productId, userId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        items: data.cartCount,
      });
    } else {
      return res
        .status(400)
        .json({
          success: data.success,
          message: data.message,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const get_cart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await get_cart_items(userId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        items: data.cartData,
        message: data.message,
      });
    } else {
      return res
        .status(400)
        .json({ message: data.message, success: data.success });
    }
  } catch (error) {
    next(error);
  }
};

export const remove_cart = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { userId } = req.body;
    const productId = parseInt(proId);

    const data = await cart_item_remove(productId, userId);
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

export const update_quantity = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { proId } = req.params;
    const productId = parseInt(proId);
    const data = await quantity_update(productId, userId);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    } else {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const reduce_quantity = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { proId } = req.params;
    const productId = parseInt(proId);
    const data = await quantity_reduce(productId, userId);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    } else {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};
