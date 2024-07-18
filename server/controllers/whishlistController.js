import { add_wishlist, get_wishlist_items, wishlist_item_remove } from "../models/whishListModel.js";

export const add_to_whishlist = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { userId } = req.body;
    const productId = parseInt(proId);
    const data = await add_wishlist(productId, userId);
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

export const get_whishlist = async (req, res, next) => {
  try {
    console.log('this is get wishlist function');
    const { userId } = req.params;
    const data = await get_wishlist_items(userId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        items: data.items,
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

export const remove_whishlist = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { userId } = req.body;
    const productId = parseInt(proId);

    const data = await wishlist_item_remove(productId, userId);
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
