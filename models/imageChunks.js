const mongoose = require('mongoose');

const imageScheme = new mongoose.Schema({}, { collection: 'imageUploads.chunks'})

const Chunk = mongoose.model('ImageUploads.chunks', imageScheme)

module.exports = Chunk;