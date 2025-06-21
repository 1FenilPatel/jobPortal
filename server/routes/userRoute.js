import express from "express";
import { getloggedinUser, login, logout, register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../Middlewares/isAuthenticate.js";
import {uploadProfilePhoto, uploadProfileWithResume } from "../Middlewares/multer.js";
const router = express.Router();

router.route("/register").post(uploadProfilePhoto,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getuser").get(isAuthenticated,getloggedinUser);
router.route("/profile/update").post(isAuthenticated,uploadProfileWithResume,updateProfile);

export default router;