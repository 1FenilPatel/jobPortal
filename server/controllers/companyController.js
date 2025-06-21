import {Company} from "../models/company.model.js";
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";

// Register new company by Authenticated and Loggedin user.
export const registerComapny = async(req,res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Comapny name is required",
                success:false
            })
        };
        
        // find company by name
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register same company",
                success:false
            })
        }
        
        company = await Company.create({
            name:companyName,
            userId:req.id
        });

        return res.status(201).json({
            message:`${company.name} register successfully`,
            success:true,
            company
        });

    } catch (error) {
        console.log(error);
    }
};


// get register companies register by user.
export const getCompany = async(req,res)=>{
    try {
        const userId = req.id; // get company from user , who is logged in and created by only that user.
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }

        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// get particular company by it's id.
export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};

// update company..
export const updateCompany = async(req,res)=>{
    try {
        const {name , description , website , location} = req.body;
        const companyId = req.params.id; // particular company updated.
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name , description , website , location , logo};

        const company = await Company.findByIdAndUpdate(companyId,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company information updated",
            success:true,
            company
        })

    } catch (error) {
        console.log(error);
    }
}