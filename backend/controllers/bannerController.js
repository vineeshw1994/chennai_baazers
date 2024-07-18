import { getDataUri } from "../utils/features.js";
import { add_navbanner, nav_banners } from "../models/bannerModel.js";

export const create_navbanner = async (req, res, next) => {
  try {
    console.log("this is the nav banner create controller");
    const { name, description, start_date, end_date, selectedProducts } =
      req.body;
    const bannerName = name.toLowerCase().trim();
    const parsedSelectedProducts = JSON.parse(selectedProducts);
    console.log(parsedSelectedProducts);
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = getDataUri(req.file);
    // return res.json({ success: true, message: "hello" });
    const data = await add_navbanner(
      bannerName,
      description,
      start_date,
      end_date,
      parsedSelectedProducts,
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
export const get_navbanner = async (req, res, next) => {
  try {
    const data = await nav_banners();
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    return res
      .status(200)
      .json({ success: data.success, banners: data.banners });
  } catch (error) {
    next(error.message);
  }
};
