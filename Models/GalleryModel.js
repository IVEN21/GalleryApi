const mongoos = require("mongoose");
const GallerySchema = mongoos.Schema({
    url:String,
    tags:[]
})

module.exports = mongoos.model("Gallery",GallerySchema);