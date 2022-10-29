const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const itemsRouter = require('./controllers/items')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const { unknownEndpoint, errorHandler, userExtractor } = require('./utils/middleware')

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

app.use('/api/items', userExtractor, itemsRouter)
app.use('/api/users', userExtractor, usersRouter)
app.use('/api/login', userExtractor, loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app