import express from "express";
import { admin_login, getUsers, get_admin, signout, update_admin } from "../controllers/adminAuthController.js";

const route = express.Router(); 

//ADMIN LOGIN
route.post("/admin-login", admin_login);

//ADMIN SIGNOUT
route.get("/admin-logout", signout);

route.get('/admin/:adminId',get_admin)

// admin information update
route.put('/update-admin/:adminId',update_admin)

// ADMIN GET ALL USERS 
route.get('/admin-getusers', getUsers)

export default route;
