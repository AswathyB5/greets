const mongoose = require('mongoose');

// Every picture uploaded from the admin panel, so the picture library can list them
// (pictures kept in Cloudinary are not in any folder we could look into).
const schema = new mongoose.Schema(
  {
    value: { type: String, required: true, unique: true }, // what is stored in content: "https://res.cloudinary.com/..." or "uploads/x.png"
    name: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UploadedImage', schema);
