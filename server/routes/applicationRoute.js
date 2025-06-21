import express from "express";
import { applyJob, getallAppliedJobs, getApplicatants, sendSMS, updateStatus } from "../controllers/applicationController.js";
import isAuthenticated from "../Middlewares/isAuthenticate.js";
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/getappliedjobs").get(isAuthenticated,getallAppliedJobs);
router.route("/:id/getApplicants").get(isAuthenticated,getApplicatants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);
router.route("/send-sms").post(sendSMS);

export default router;