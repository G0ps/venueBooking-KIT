import { Router } from "express";
import upload from "../database/image/imageStorage.js";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

const imageRouter = Router();

imageRouter.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "✅ Image uploaded to MongoDB GridFS",
    file: req.file
  });
});


imageRouter.get("/image/:filename", async (req, res) => {
  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db, { bucketName: "images" });

  const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

  downloadStream.on("error", () => {
    res.status(404).send("Image not found");
  });

  downloadStream.pipe(res);
});


export default imageRouter
