import express from "express";

const route = express.Router();

import {
  addAddress,
  deleteUser,
  getAddress,
  login,
  signUp,
  signout,
  signup_Otpvalidation,
  userUpdate,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

route.post("/sign-in", login);
route.post("/sign-up", signUp);

route.post("/signup-otp", signup_Otpvalidation);

route.put("/update-user", verifyToken, userUpdate);

route.get("/signout", signout);

route.delete("/delete/:userId", verifyToken, deleteUser);

route.post("/address/:id", addAddress);

route.get("/getaddress/:id", getAddress);

export default route;
