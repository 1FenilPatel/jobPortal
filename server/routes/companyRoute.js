import express from "express";
import { getCompany, getCompanyById, registerComapny, updateCompany } from "../controllers/companyController.js";
import isAuthenticated from "../Middlewares/isAuthenticate.js";
import {uploadProfilePhoto } from "../Middlewares/multer.js";
const router = express.Router();

router.route("/register").post(isAuthenticated,registerComapny);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,uploadProfilePhoto,updateCompany);

export default router;