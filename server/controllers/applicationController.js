import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import twilio from "twilio";

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id; // applicants id
        const jobId = req.params.id;

        
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })
        }

        // check if user has already apply for job or not ?
        const existingApplication = await Application.findOne({job:jobId,applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }

        // check if job is exists
        const job = await Job.findById(jobId).populate({
            path:"company"
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);;
        await job.save();
        await newApplication.save();

        return res.status(201).json({
            message:"Job applied successfully",
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
};

// get all jobs applied by user.
export const getallAppliedJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(401).json({
                message:"No Application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// for admin , show how many applicant apply for job.
export const getApplicatants = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        .populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: [
                { path: "applicant" },  // Fetch applicant details
                { path: "job", populate: { path: "company" } }  // Fetch job and company details
            ]
        });

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(201).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status || !['pending', 'accepted', 'rejected'].includes(status)){
            return res.status(401).json({
                message:"Invalid status value.",
                success:false
            })
        }

        // find application by applicant id
        const updatedApplication   = await Application.findByIdAndUpdate(
            { _id: applicationId },
            { $set: { status } },
            { new: true }
        );

        if(!updatedApplication ){
            return res.status(401).json({
                message:"Application not found",
                success:false
            })
        }

         res.status(200).json({
            message:"Application status updated successfully",
            success:true,
            application:updatedApplication,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the application status.",
            success: false,
        });
    }
}

const sendSMS = async (req, res) => {
    try {
      let { phoneNumber, message } = req.body;
  
      if (!phoneNumber || !message) {
        console.error("❌ ERROR: Missing phoneNumber or message in request body.");
        return res.status(400).json({ success: false, message: "Missing phone number or message." });
      }

      phoneNumber = String(phoneNumber).trim();
  
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      const toNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;

  
      console.log(`📨 Sending SMS: From=${fromNumber}, To=${toNumber}, Message=${message}`);
  
      if (fromNumber === toNumber) {
        console.error("❌ ERROR: Twilio 'From' and 'To' numbers cannot be the same.");
        return res.status(400).json({ success: false, message: "Invalid recipient number." });
      }
  
      const messageResponse = await client.messages.create({
        body: message,
        from: fromNumber,
        to: toNumber,
      });
  
      console.log("✅ SMS Sent:", messageResponse.sid);
      res.status(200).json({ success: true, message: "SMS sent successfully." });
    } catch (error) {
      console.error("❌ Error sending SMS:", error);
  
      if (error.code) {
        // Twilio-specific error handling
        return res.status(500).json({ success: false, message: `Twilio Error: ${error.message}` });
      }
  
      res.status(500).json({ success: false, message: "Failed to send SMS." });
    }
  };
  
  export { sendSMS };