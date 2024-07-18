import {
  admin_update,
  allUsers, 
  getAdmin,
  loginAdmin,
} from "../models/adminAuthModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const admin_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || email === "" || !password || password === "") {
      return errorHandler(400, "All Fields are required");
    }
    const data = await loginAdmin(email, password);
    if (!data.success) {
      return res.status(400).json({ message: data.message });
    }
    console.log(data.admin); 
    if (data.success) {
      const token = jwt.sign(
        {
          id: data.admin.id,
          email: data.admin.email,
          mobile: data.admin.mobile,
          isAdmin: data.admin.isAdmin,
        },
        process.env.JWT_SECRET
      );
      const { password: pass, ...admin } = data.admin;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ admin, message: data.message, success: data.success });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    console.log("logout function");
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "Signout Successfully" });
  } catch (error) {
    next(error);
  }
};

// get admin details
export const get_admin = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const data = await getAdmin(adminId);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      const { password: pass, ...admin } = data.data;
      return res.status(200).json({
        success: data.success,
        admin,
        message: data.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

// update admin information
export const update_admin = async (req, res, next) => {
  try {
    console.log("this is the admin update controller");
    const { adminId } = req.params;

    const { username, email, mobile,password } = req.body;
    console.log(req.body,'<------------');

    const data = await admin_update(adminId, username, email, mobile, password);
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

// get all users
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit =10
    const data = await allUsers(page,limit);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        users: data.users,
        message: data.message,
      });
    }
  } catch (error) {
    next(error);
  }
};
