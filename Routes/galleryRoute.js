const express = require("express")
const galleryRoute = express.Router()
const GalleryModel = require("../Models/GalleryModel")
const { cloudinary } = require("../cloudinary");
galleryRoute.get("/",async(req,res)=>{
   
    try {
        const galleries = await GalleryModel.find();
        res.send(galleries) 
    } catch (error) {
        res.json(error)
    }
})

//upload to database
galleryRoute.post("/", async (req, res) => {
    const clip = new GalleryModel({
      url: req.body.url,
      tags:req.body.tags
    });
    const addClip = await clip.save();
    res.json(addClip);
    
  });

//upload to cloudinary
galleryRoute.post("/drawing_upload", async (req, res) => {
    try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "gallery",
      });
      res.send(uploadResponse.secure_url);
    } catch (err) {
      res.status(500).json({ err: "Upload to cloud went wrong" });
    }
  });

  galleryRoute.get("/:id", async (req, res) => {
    try {
      const clips = await ClipModel.findById(req.params.id);
      res.send(clips);
    } catch (error) {
      res.json(error);
    } 
  });
  
  galleryRoute.get("/", async (req, res) => {
    try {
      const clips = await ClipModel.find();
      res.send(clips);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = galleryRoute;