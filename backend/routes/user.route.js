import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();

router.post("/register", singleUpload,register);
router.post("/login",login);
router.put("/profile/update",isAuthenticated,singleUpload,updateProfile);
router.get("/logout",logout);
export default router;