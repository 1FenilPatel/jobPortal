import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Provider from "../models/serviceProvider.model.js";
import User from "../models/user.model.js";

export const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Invalide Credentials",
                success:false
            })
        };

        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({
                message:"Admin not Found",
                success:false
            })
        };

        const isPasswordMatch = bcrypt.compare(password,admin.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Invalide Credentials",
                success:false
            })
        };

        const token = jwt.sign({
            id:admin._id,
            role:admin.role,
        },process.env.HASED_KEY,{expiresIn:"15d"});

        res.cookie("token",{httpOnly:true, sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000});

        return res.status(200).json({
            message:'Admin login Successfully',
            success:true,
            admin,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Server error during admin login"});
    }
};

export const providerApproval = async(req,res)=>{
    const {providerId,isApproved} = req.body;

    try {
        const updateRequest = await Provider.findByIdAndUpdate(
            providerId,
            {isApproved,approvalRequest:false},
            {new:true} // Return the updated provider after modification
        )

        if(!updateRequest){
            return res.status(400).json({
                message:"Provider not found",
                success:false
            })
        };

        return res.status(200).json({
            success:true,
            updateRequest
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Server error during request approval", success:false});
    }
};

export const getPendingProvider = async(req,res)=>{
    try {
        const getProvider = await Provider.find({
            role:'provider',
            gstno:{$ne:null}
        });

        return res.status(200).json({
            success:true,
            provider:getProvider
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Server error during geting Providers",success:false});
    }
};

export const getAllLoggedinUser = async(req,res)=>{
    try {
        const getUser = await User.find({
            role:"user"
        });

        if(!getUser){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        };

        return res.status(200).json({
            success:true,
            user:getUser
        })
    } catch (error) {
        console.log(error);
    }
};

export const removeUser = async(req,res)=>{
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        };

        return res.status(200).json({
            message:"User Remove Successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
         return res.status(401).json({message:"Server error during deleting user"});
    }
};