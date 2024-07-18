import express from "express";

const route = express.Router();

import {
  addAddress,
  address_update,
  deleteUser,
  getAddress,
  get_user,
  signUp,
  signout,
  signup_Otpvalidation,
  single_address,
  userUpdate,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

route.post("/sign-up", signUp);

route.post("/signup-otp", signup_Otpvalidation);

route.put("/update-user", verifyToken, userUpdate);

route.get("/signout", signout);

route.delete("/delete/:userId", verifyToken, deleteUser);

route.get('/get-user/:userId',verifyToken, get_user)

route.post("/address/:id", addAddress);

route.get("/getaddress/:id", getAddress);

route.post("/single-address/:userId", single_address);

route.put("/address-update/:userId", address_update);

export default route;
