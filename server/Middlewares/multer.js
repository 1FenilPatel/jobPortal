import multer from "multer";

// Configure storage in memory
const storage = multer.memoryStorage();

// Middleware for handling only profile photo upload
export const uploadProfilePhoto = multer({ storage }).single("profilePhoto");

// Middleware for handling both profile photo & resume upload
export const uploadProfileWithResume = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
