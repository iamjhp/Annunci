require('dotenv').config()

// Set the port defined in .env
const PORT = process.env.PORT

// Take the test or live database depending on the input
const MONGODB_URI = process.env.NODE_ENV == 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}