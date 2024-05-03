const app = require('./app')
const logger = require('./backend/config/logger.config')
let server

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  //   console.log(`App is running on port ${PORT}, press Ctrl+C to Terminate.`)
})

// Listen for the SIGINT signal (Ctrl+C)
process.on('SIGINT', () => {
  logger.warn('Server received SIGINT signal.', {
    service: 'Application'
  })

  // Perform any cleanup or additional logging before stopping the server
  // Check if server is defined before trying to close it
  if (server) {
    server.close(() => {
      logger.warn('Server stopped.', { service: 'Application' })

      // Ensure that the logger has finished writing to the file before exiting
      logger.on('finish', () => {
        process.exit(0)
      })
    })
  } else {
    logger.warn('Server is not running (STOPPED).', { service: 'Application' })

    // Ensure that the logger has finished writing to the file before exiting
    logger.on('finish', () => {
      process.exit(0)
    })
  }
})
