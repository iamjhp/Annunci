const itemsRouter = require('express').Router();
const Item = require('../models/item');
const User = require('../models/user')
const ImageFile = require('../models/imageFiles')
const ImageChunk = require('../models/imageChunks')
const imageHelper = require('../utils/imageHelper');
const config = require('../utils/config')
const mongoose = require("mongoose");
const url = config.MONGODB_URI

/*
  Create connection to MongoDB using GridFsBucket to save image files
  GridFs splits a file into chunks during storage
*/
const conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
let gfsBucket
conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'imageUploads',
  })
})

itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

itemsRouter.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id)
  res.json(item)
})

itemsRouter.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('ads', { id: 1, title: 1, createdAt: 1, fileId: 1, price: 1 })
  res.json(user)
})

/*
  Post Request to save an Ad
  First, it checks whether the user has a valid token
  If yes, then an ad is created and confirmed with 201
  otherwise 401 error
*/
itemsRouter.post(
  '/',
  imageHelper.upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid'})
      }
      const body = req.body;
      let fileName = req.file ? req.file.filename : ''
      let fileId = req.file ? req.file.id : ''

      // find the user in DB to save userId
      const { email, token } = req.user
      const user = await User.findOne({ email })

      const newItem = new Item({
        title: body.title,
        description: body.description,
        owner: body.owner,
        offer: body.offer,
        price: body.price,
        filename: fileName,
        fileId: fileId,
        user: user._id
      });

      const savedNewItem = await newItem.save()
      user.ads = user.ads.concat(savedNewItem._id)
      await user.save()

      res.status(201).json(savedNewItem)
    } catch (e) {
      next(e)
    }
  }
);

itemsRouter.post('/:id/commentAd', async (req, res) => {
  const { id } = req.params
  const { comment } = req.body
  const targetItem = await Item.findById(req.params.id)

  targetItem.comments.push(comment)

  const updtedItem = await Item.findByIdAndUpdate(id, targetItem, { new: true })

  res.json(updtedItem)
})


itemsRouter.delete('/:id', async (req, res) => {
  const itemToDelete = await Item.findById(req.params.id)
  if (!itemToDelete) {
    return res.status(204).end()
  }

  if (itemToDelete.user && itemToDelete.user.toString() !== req.user.id) {
    return response.status(401).json({
      error: 'only the owner can delete this ad'
    })
  }

  // remove ad item in DB
  await Item.findByIdAndRemove(req.params.id)

  // remove image files and chunks
  try {
    gfsBucket.delete(new mongoose.Types.ObjectId(itemToDelete.fileId))
  } catch (e) {
    console.log("Error: " + e);
  }

  res.status(204).end()
})

itemsRouter.get('/images', async (req, res) => {
  const items = await Item.find({});
  const fileIDs = items.map(img => img.fileId)

  res.status(201).json(fileIDs);
})

itemsRouter.get('/images/:id', async (req, res, next) => {
  try{
    const id = req.params.id
    gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(id)).pipe(res);
  } catch(e) {
    next(e)
  }
})


module.exports = itemsRouter;
