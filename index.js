const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// start the server with the corresponding port
const server = http.createServer(app)
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})