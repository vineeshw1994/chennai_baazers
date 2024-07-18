import { createAddressTable, createUserTable } from "../models/userModel.js";
import { createCart } from "../models/cartModel.js";
import { createCategory } from "../models/categoryModel.js";
import { createSubCategory } from "../models/subCategoryModel.js";
import { createProducts } from "../models/productModel.js";
import { createWhishlist } from "../models/whishListModel.js";
import { createOrder } from "../models/orderModel.js";
import { createOtp } from "../models/otpModel.js";
import { brandTable } from "../models/brandModel.js";
import { createAdminTable } from "../models/adminAuthModel.js";
import { createNavBanner } from "../models/bannerModel.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createCategory();
    await createSubCategory();
    await createCart();
    await createWhishlist();
    await createProducts();
    await createOrder();
    await createOtp();
    await brandTable();
    await createAddressTable();
    await createAdminTable();
    await createNavBanner();
    console.log("All tables created successfully");
  } catch (error) {
    console.log("error creating table ", error.message);
  } 
};
