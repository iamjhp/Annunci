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

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors()) // Allow for requests from all origins

/**
 * Whenever express gets an HTTP GET requests it will check first
 * if the build directory contains a file corresponding to the request's address
 */
app.use(express.static('build'))

// Parse incoming requests with JSON payloads
app.use(express.json())

// Use new routers with middlewares userExtractor
app.use('/api/items', userExtractor, itemsRouter)
app.use('/api/users', userExtractor, usersRouter)
app.use('/api/login', userExtractor, loginRouter)

// Use unkownEndpoint middleware for unknown endpoints
app.use(unknownEndpoint)

// Use middleware for error handling
app.use(errorHandler)

module.exports = app