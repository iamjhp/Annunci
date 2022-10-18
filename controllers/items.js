const itemsRouter = require('express').Router()
const Item = require('../models/item')


itemsRouter.get('/', async (req, res) => {
  const items = await Item
    .find({})

    res.json(items)
})

module.exports = itemsRouter