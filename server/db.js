import mongoose from "mongoose";

const ConnectDb = (rea,res)=>{
    mongoose.connect("mongodb+srv://patelfenil868:fenil2005@cluster0.sv5tj.mongodb.net/").then(()=>{
        console.log('MongoDb  Connected');
    }).catch((error)=>{
        console.log(error);
    })
}
export default ConnectDb;