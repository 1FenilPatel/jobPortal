import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import adminRoute from "./routes/adminRoute.js";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
const corsOption ={
    origin:'https://hired-lemon-nine.vercel.app/',
    credentials:true
}
app.use(cors(corsOption));


app.get("/",(req,res)=>{
    res.send("hello");
});

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    ConnectDb();
    console.log(`Server listen at port ${PORT}`);
})