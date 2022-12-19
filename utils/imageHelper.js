const methodOverride = require('method-override')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const config = require('./config')
const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can only jpg or pgn Upload Images!!");
  }
};

// Create a new GirdFSStorage for saving the images
const storage = new GridFsStorage({
  url: config.MONGODB_URI,
  file: (req, file) => ({
    filename: `${file.originalname}_${Date.now()}`,
    bucketName: 'imageUploads',
    chunkSize: 500000,
  })
})

// Store uploaded files with Multer directly to MongoDb 
const upload = multer({ 
  storage,
  limits: { fieldSize: 1048576}, // 10 Mb
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
})

module.exports = {
  upload,
}