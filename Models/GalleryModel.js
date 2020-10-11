const mongoos = require("mongoose");
const GallerySchema = mongoos.Schema({
  url: String,
  tags: [
    { tag: String },
    { tag: String },
    { tag: String },
    { tag: String },
    { tag: String },
  ],
});

module.exports = mongoos.model("Gallery", GallerySchema);
