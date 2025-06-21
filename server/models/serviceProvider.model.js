import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    location:{
        type:String
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    approvalRequest:{
        type:Boolean,
        default:false
    },
    gstno:{
        type:String
    },
    role:{
        type:String,
        default:'provider'
    },
    profile:{
       profilePhoto:{type:String,default:""}
    }
});

const Provider = new mongoose.model("Provider",providerSchema);
export default Provider;