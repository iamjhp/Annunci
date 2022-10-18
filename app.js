const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const itemsRouter = require('./controllers/items')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/items', itemsRouter)

module.exports = app