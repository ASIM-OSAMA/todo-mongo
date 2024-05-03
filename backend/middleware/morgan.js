const morgan = require('morgan')
const logger = require('../config/logger.config')

// morgan logger setup
const morganMiddleware = morgan(
  // Define message format string (this is the default one with some modifications).
  // try adding response size, , size: :res[bytes] bytes not working.
  `:method, url: :url, status: :status, type: :res[content-type], length: :res[content-length] - :response-time ms`,
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: message => logger.http(message.trim(), { service: 'HTTP' })
    }
  }
)

module.exports = morganMiddleware
