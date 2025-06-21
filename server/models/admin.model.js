import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    role:{
        type:String,
        default:'admin'
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Admin = mongoose.model("Admin",adminSchema);
export default Admin;