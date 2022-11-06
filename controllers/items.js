const itemsRouter = require('express').Router();
const Item = require('../models/item');

const imageHelper = require('../utils/imageHelper');
const config = require('../utils/config')

const mongoose = require("mongoose");
const { response } = require('../app');
const url = config.MONGODB_URI

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

itemsRouter.post(
  '/',
  imageHelper.upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return response.status(401).json({ error: 'token missing or invalid'})
      }
      const body = req.body;

      const newItem = new Item({
        title: body.title,
        description: body.description,
        owner: 'empty',
        offer: body.offer,
        price: body.price,
        filename: req.file.filename,
        fileId: req.file.id,
      });

      

      const savedNewItem = await newItem.save();
      res.status(201).json(savedNewItem);
    } catch (e) {
      next(e);
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
