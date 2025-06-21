import { populate } from "dotenv";
import { Job } from "../models/job.model.js";

// create new job by recruiter
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      experiance,
      salary,
      location,
      jobType,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // Logged-in user ID

    // Check if all required fields are present
    if (
      !title ||
      !description ||
      !requirement ||
      !experiance ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check if a job with the same title and company already exists
    const existingJob = await Job.findOne({ title, company: companyId });

    if (existingJob) {
      return res.status(409).json({
        message: "A job with this title already exists for the same company.",
        success: false,
      });
    }

    // Create a new job if it doesn't exist
    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","), // Convert requirements to array
      salary: Number(salary),
      location,
      jobType,
      experiance,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New Job is Created",
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// get all jobs applied by student.
export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // search query (student search job by it's type and it's description)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // populate use for company , that is search by this query. means we search company info by this query
    const jobs = await Job.find(query)
      .populate({
        path: "company", // model's property  name is same as company.
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get job by Id. for student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // url id

    const job = await Job.findById(jobId)
      .populate("company") // This will populate the company details
      .populate({
        path: "applications",
        populate: {
          path: "applicant", // Populate applicant details inside applications
        },
      });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(201).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for admin , kitne job create kar raha hai vo
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(201).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
