import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Provider from "../models/serviceProvider.model.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  console.log("Incoming Cookies : ", req.cookies);
//   console.log(
//     "Decoded token : ",
//     jwt.verify(req.cookies.token, process.env.HASED_KEY)
//   );

  if (!token) {
    return res.status(401).json({
      message: "User not authenticated",
      success: false,
    });
  }

  try {
    const decode = jwt.verify(token, process.env.HASED_KEY);
     if (!decode) {
      return res.status(401).json({
        message: "Invalide token",
        success: false,
      });
    }


    let user = null;

    if(decode.role === "user"){
        user = await User.findById(decode.id);
    }else if(decode.role === "provider"){
        user = await Provider.findById(decode.id);
    }

    if(!user){
        return res.status(404).json({
            message:"User not found",
            success:false
        })
    }

    req.user = user;
    req.role = decode.role;
    req.id = decode.id; // this userId is token saved id .
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuthenticated;
