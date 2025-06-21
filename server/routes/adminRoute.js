import express from "express";
import { adminLogin, getAllLoggedinUser, getPendingProvider, providerApproval, removeUser } from "../controllers/adminController.js";
const router = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/approveRequest").put(providerApproval);
router.route("/getProvider").get(getPendingProvider);
router.route("/getAlluser").get(getAllLoggedinUser);
router.route("/removeUser/:id").delete(removeUser);

export default router;