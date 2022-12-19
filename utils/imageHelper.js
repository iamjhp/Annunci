const methodOverride = require('method-override')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const config = require('./config')

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
const upload = multer({ storage })

module.exports = {
  upload,
}