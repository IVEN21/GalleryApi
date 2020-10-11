//dependencies & modules
const GalleryModel = require("./Models/GalleryModel")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const galleryRoute = require("./Routes/galleryRoute")
const userRoute = require("./Routes/userRoute")
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());
app.use("/author",userRoute)
app.use("/gallery",galleryRoute)


//connet to database
mongoose.connect(process.env.MONGO_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.on("connected", () => {
    console.log("Databased Connected");
  });

  
//app listen
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
app.get("/",async(req,res)=>{
   
  try {
      const galleries = await GalleryModel.find();
      res.send(galleries) 
  } catch (error) {
      res.json(error)
  }
})

