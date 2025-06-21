import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String
    },
    dob:{
        type:String
    },
    location:{
        type:String
    },
    profile:{
        bio:{type:String},
        skills:[
            {
                type:String
            }
        ],
        resume:{type:String},
        resumeOriginalName:{
            type:String
        },
        company:{type:mongoose.Schema.Types.ObjectId , ref:'Company'},
        profilePhoto:{type:String,default:""}
}
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;

