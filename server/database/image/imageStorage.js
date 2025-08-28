import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const storage = new GridFsStorage({
  db: mongoose.connection, // <-- use the live connection
  file: (req, file) => {
    return {
      filename: Date.now() + "-" + file.originalname,
      bucketName: "images"
    };
  }
});

const upload = multer({ storage });
export default upload;
