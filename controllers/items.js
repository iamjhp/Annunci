const itemsRouter = require('express').Router();
const Item = require('../models/item');
const User = require('../models/user')
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
