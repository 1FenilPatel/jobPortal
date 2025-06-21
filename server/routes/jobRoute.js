import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticate.js";
import { getAdminJobs, getJobById, getJobs, postJob } from "../controllers/jobController.js";
const router = express.Router();

router.route("/postJob").post(isAuthenticated,postJob);
router.route("/getAllJobs").get(isAuthenticated,getJobs);
router.route("/getAdminJobs").get(isAuthenticated,getAdminJobs);
router.route("/getjobById/:id").get(isAuthenticated,getJobById);

export default router;