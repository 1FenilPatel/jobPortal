import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../Utils/dataUri.js";
import cloudinary from "../Utils/cloudinary.js";
import validator from "validator";
import User from "../models/user.model.js";
import Provider from "../models/serviceProvider.model.js";
import Admin from "../models/admin.model.js";


// register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password,role } = req.body;

    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    };
    
    // validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number format",
        success: false,
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Profile photo is required",
        success: false,
      });
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return res.status(400).json({
        message: "Profile photo must be less than 2MB",
        success: false,
      });
    }

    
    const fileUri = getDataUri(file);
    if (!fileUri || !fileUri.content) {
      return res.status(400).json({
        message: "Error generating file URI",
        success: false,
      });
    }
    
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    if (!cloudResponse || !cloudResponse.secure_url) {
      return res.status(500).json({
        message: "Error uploading file to Cloudinary",
        success: false,
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email alredy in use",
        success: false,
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    
    let newUser;
    switch(role){
        case 'user':
          newUser = new User({
            fullname,
            email,
            phoneNumber,
            password:hasedPassword,
            role,
            profile:{
              profilePhoto:cloudResponse.secure_url
            }
          });
          break;

        case 'provider':
            newUser = new Provider({
              fullname,
              email,
              password:hasedPassword,
              role,
              profile:{
                profilePhoto:cloudResponse.secure_url
              }
            });
            break;

         case 'admin':
            newUser = new Admin({
              email,
              password:hasedPassword,
              role
            });
            break;

          default:
             return res.status(400).json({
                message:"Invalid role specified",
                success:false
             });
    }

    await newUser.save();
    res.status(200).json({
      message:`${role} login successfully`,
      success:true
    })

    // const newUser = await User.create({
    //   fullname,
    //   email,
    //   phoneNumber,
    //   password: hasedPassword,
    //   profile:{
    //     profilePhoto:cloudResponse.secure_url,
    //   }
    // });

    // return res.status(201).json({
    //   newUser,
    //   message: "User Register Sucessfully",
    //   success: true,
    // });
  } catch (error) {
    console.log(error);
  }
};

// Get static admin credentials from environment variables
// const staticAdminEmail = process.env.STATIC_ADMIN_EMAIL || "fenil@yahoo.com";
// const staticAdminPassword = process.env.STATIC_ADMIN_PASSWORD || "fenil@2005";

export const login = async (req, res) => {
  // try {
  //   const { email, password } = req.body;
    
  //   // Validate inputs
  //   if (!email || !password) {
  //     return res.status(400).json({
  //       message: "Email and password are required",
  //       success: false,
  //     });
  //   }

  //    if (email.trim().toLowerCase() === staticAdminEmail.trim().toLowerCase()) {
  //     if (password === staticAdminPassword) {
  //       // Fetch admin user from database
  //       const adminUser = await User.findOne({ email: staticAdminEmail });
  //       if (!adminUser) {
  //         return res.status(400).json({ message: "Admin not found", success: false });
  //       }

  //       const token = jwt.sign(
  //         { userId: adminUser._id.toString() },
  //         process.env.HASED_KEY,
  //         { expiresIn: "15d" }
  //       );


  //       return res
  //         .status(200)
  //         .cookie("token", token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
  //         .json({
  //           message: "Welcome admin",
  //           success: true,
  //           user: {
  //             _id: adminUser._id.toString(),
  //             fullname: adminUser.fullname,
  //             email: adminUser.email,
  //           },
  //           token,
  //         });
  //     } else {
  //       return res.status(400).json({
  //         message: "Incorrect email or password",
  //         success: false,
  //       });
  //     }
  //   }


  //   let user = await User.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json({
  //       message: "Incorrect email or password",
  //       success: false,
  //     });
  //   }

  //   const isPasswordMatch = await bcrypt.compare(password, user.password);
  //   if (!isPasswordMatch) {
  //     return res.status(400).json({
  //       message: "Incorrect email or password",
  //       success: false,
  //     });
  //   }

  //   const tokenData = {
  //     userId: user._id,
  //   };

  //   const token = jwt.sign(tokenData, process.env.HASED_KEY, { expiresIn: "15d" });

  //   const userResponse = {
  //     _id: user._id,
  //     fullname: user.fullname,
  //     email: user.email,
  //     phoneNumber: user.phoneNumber,
  //     profile: user.profile,
  //   };

  //   return res.status(200)
  //     .cookie("token", token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
  //     .json({
  //       message: `Welcome back ${user.fullname}`,
  //       success: true,
  //       user: userResponse,
  //       token,
  //     });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     message: "Server error",
  //     success: false,
  //   });
  // }

  try {
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return res.status(400).json({
          message:"All fields are required",
          success:false
        })
    };

    let newUser;
    switch(role){
         case 'user':
              newUser = await User.findOne({email});
          break;

          case 'provider':
              newUser = await Provider.findOne({email});
          break;

          case 'admin':
              newUser = await Admin.findOne({email});
          break;

          default:
            return res.status(400).json({message:"Ivalide role"});
    }

    if(!newUser){
      return res.status(400).json({
        message:"No account found",
        success:false
      });
    }

    const isPasswordValid = bcrypt.compare(password,newUser.password);
    if(!isPasswordValid){
      return res.status(400).json({
        message:"Invalid Credentials",
        success:false
      })
    };

    const token = jwt.sign({
      id:newUser._id,
      role:newUser.role,
      email:newUser.email
    },process.env.HASED_KEY,{expiresIn:'15d'});


    res.cookie("token",token,{  
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

      return res.status(200).json({
        message:`${role} login Successfully`,
        success:true,
        newUser,
        token,
        email
      })

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server error during login"});
  }
};


// logout
export const logout = async (req, res) => {
  try { 
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
        success: false,
      });
    }

    const {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
      gender,
      dob,
      location,
      gstno,
    } = req.body;

    const userId = req.id;
    console.log("User ID from req.id:", userId);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // 🛠 Get the correct user model based on role
    let user;
    if (req.role === "provider") {
      user = await Provider.findById(userId);
    } else {
      user = await User.findById(userId);
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // 🛠 Ensure profile exists
    if (!user.profile) {
      user.profile = {};
    }

    let skillArray;
    if (skills) {
      skillArray = skills.split(",").map((skill) => skill.trim());
    }

    // 🛠 Update user fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if(phoneNumber && !isNaN(phoneNumber)){
      user.phoneNumber = Number(phoneNumber);
    }
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillArray;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (location) user.location = location;

    // 🛠 If provider, handle GST and approval flag
    if (req.role === "provider") {
      if (!user.isApproved) {
        if (gstno) user.gstno = gstno;
        user.approvalRequest = true;
        user.isApproved = false;
      } else {
        if (gstno) user.gstno = gstno;
      }
    }

    // 🛠 Upload profile photo if provided
    if (req.files?.profilePhoto?.[0]) {
      try {
        const profilePhotoBuffer = req.files.profilePhoto[0].buffer;
        const profilePhotoUpload = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "profile_photos" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(profilePhotoBuffer);
        });

        if (profilePhotoUpload?.secure_url) {
          user.profile.profilePhoto = profilePhotoUpload.secure_url;
        }
      } catch (error) {
        console.error("Profile Photo Upload Error:", error);
        return res.status(500).json({
          message: "Failed to upload profile photo",
          success: false,
        });
      }
    }

    // 🛠 Upload resume if provided
    if (req.files?.resume?.[0]) {
      const resumeBuffer = req.files.resume[0].buffer;
      const resumeUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "raw", folder: "resumes", format: "pdf" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(resumeBuffer);
      });

      user.profile.resume = resumeUpload.secure_url;
      user.profile.resumeOriginalName = req.files.resume[0].originalname;
    }

    // 🛠 Save updated user
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error. Profile update failed.",
      success: false,
      error: error.message,
    });
  }
};

export const getloggedinUser = async(req,res)=>{
  
  if(!req.user || !req.user.email){
    return res.status(400).json({
      message:"Unauthorized: User not Authenticated",
      success:false
    })
  };

  const email = req.user.email;
  console.log("Authenticated email : ",email);

  try {
    const user = await Provider.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"User not found",
        success:false
      })
    };

    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log(error);
  }
};

