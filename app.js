// const env = process.env.NODE_ENV || 'development'

const express = require('express')
const logger = require('./backend/config/logger.config')
const connectDB = require('./backend/config/db.config')
const compression = require('compression')
const compress = require('./backend/middleware/compression')
const responseTime = require('response-time')
const helmet = require('helmet')
const todoRoutes = require('./backend/routes/todo.routes')
const userRoutes = require('./backend/routes/user.routes')
const bodyParser = require('body-parser')
const { errorHandler } = require('./backend/middleware/errorhandler')
const morganMiddleware = require('./backend/middleware/morgan')

app = express()

app.use(helmet())

// Disable X-Powered-By header
app.disable('x-powered-by')

const PORT = process.env.PORT || 5000

// Send the contents of the .env file to the process.env object
require('dotenv').config()

connectDB()

app.use(compression({ filter: compress }))

app.use(responseTime())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// bodyParser.defaultCharset('utf-8')

app.use(morganMiddleware)

app.use('/todos', todoRoutes)
app.use('/todos/users', userRoutes)

// Use error handler only in development and testing
if (process.env.NODE_ENV !== 'PRODUCTION') {
  app.use(errorHandler)
}

logger.info(`App is running on port ${PORT}.`, { service: 'Application' })

// // Listen for the SIGINT signal (Ctrl+C)
// process.on('SIGINT', () => {
//   console.log('Server received SIGINT signal. Logging stop time...')
//   const stopTime = new Date().toISOString()
//   console.log('Server stop time:', stopTime)

//   // Perform any cleanup or additional logging before stopping the server
//   server.close(() => {
//     console.log('Server stopped')
//     process.exit(0)
//   })
// })

module.exports = app
