const logger = require('./logger.config')
const mongoose = require('mongoose')
const credentials = require('./.credentials')

require('dotenv').config()

// Check NODE_ENV

let MONGO_URI
// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

const connectDB = async () => {
  if (process.env.NODE_ENV === 'PRODUCTION') {
    // MONGO_URI = process.env.MONGO_URI
    console.log('MONGO_PRODUCTION_URI NOT SETUP YET!')
  } else if (process.env.NODE_ENV === 'DEVELOPMENT') {
    MONGO_URI = process.env.MONGO_URI
  } else if (process.env.NODE_ENV === 'test') {
    MONGO_URI = process.env.MONGO_JEST_URI
  }

  try {
    // console.log('MONGO_URI: ', MONGO_URI)
    await mongoose.connect(MONGO_URI)
    // await mongoose.createConnection(MONGO_URI)

    logger.info(`Connected!`, { service: 'Database' })
  } catch (error) {
    logger.error(`Could not Connect! ${error}`, {
      service: 'Database'
    })

    process.exit(1)
  }
}

module.exports = connectDB
