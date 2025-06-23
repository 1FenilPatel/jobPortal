import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Provider from "../models/serviceProvider.model.js";

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // ✅ Extract JWT
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

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
        message: "Invalid token",
        success: false,
      });
    }

    let user = null;

    if (decode.role === "user") {
      user = await User.findById(decode.id);
    } else if (decode.role === "provider") {
      user = await Provider.findById(decode.id);
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user;
    req.role = decode.role;
    req.id = decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuthenticated;
