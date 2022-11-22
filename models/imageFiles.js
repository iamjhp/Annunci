const mongoose = require('mongoose');

const imageScheme = new mongoose.Schema({}, { collection: 'imageUploads.files'})

const File = mongoose.model('ImageUploads.files', imageScheme)

module.exports = File;