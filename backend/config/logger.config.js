const winston = require('winston')
require('winston-daily-rotate-file')

// Severity of all levels is assumed to be numerically ascending from most important to least important.

customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
    //   trace
    // operation: CRUD
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'green',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta'
  }
}

// Rearrange timestamp, level, service, message

const customFormat = winston.format.printf(
  ({ timestamp, level, message, service }) => {
    return `[${timestamp}] ${level.toUpperCase()} ${service}: ${message}`
  }
)

// Server filter
const serverFilter = winston.format((info, opts) => {
  return info.service === 'Server' ? info : false
})

// Application filter
const appFilter = winston.format((info, opts) => {
  return info.service === 'Application' ? info : false
})

// Database filter
const dbFilter = winston.format((info, opts) => {
  return info.service === 'Database' ? info : false
})

// uncaughtException filter
const uncaughtExceptionFilter = winston.format((info, opts) => {
  return info.service === 'uncaughtException' ? info : false
})

// unhandledRejection filter
const unhandledRejectionFilter = winston.format((info, opts) => {
  return info.service === 'unhandledRejection' ? info : false
})

const logger = winston.createLogger({
  // 	Log only if info.level is less than or equal to this level
  level: 'silly',

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'ddd DD-MM-YYYY HH:mm:ss.SSS A Z'
    }),
    // winston.format.align(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    customFormat
  ),
  // defaultMeta: { service: 'main-logger' }, // if you uncomment this, it will override all metadata when calling logger!

  transports: [
    // Write all logs with importance level of `error` or less to `error.log`

    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: './backend/logs/errors-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m'
    }),

    // Write all logs with importance level of `info` or less to `base.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/base-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m'
    }),

    // Write all logs with service of `Server` to `server.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/server-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m',
      format: winston.format.combine(serverFilter(), customFormat)
    }),

    // Write all logs with service of `Application` to `app.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/application-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m',
      format: winston.format.combine(appFilter(), customFormat)
    }),

    // Write all logs with service of `Database` to `db.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/db-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m',

      format: winston.format.combine(dbFilter(), customFormat)
    }),

    // Write all logs with service of `uncaughtException` to `uncaughtException.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/uncaughtException-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m',

      format: winston.format.combine(uncaughtExceptionFilter(), customFormat)
    }),

    // Write all logs with service of `unhandledRejection` to `unhandledRejection.log`
    new winston.transports.DailyRotateFile({
      filename: './backend/logs/unhandledRejection-%DATE%.log',

      //Rotate every month.
      datePattern: 'YYYY-MM',

      //Compress the rotated log file.
      zippedArchive: true,

      //Maximum size of log file is 100MB.
      maxSize: '100m',

      format: winston.format.combine(unhandledRejectionFilter(), customFormat)
    })
  ]
})

// Handle Uncaught Exception:
process.on('uncaughtException', error => {
  // logger.error('UncaughtException: ', error, { service: 'uncaughtException' })
  logger.error(error.stack, { service: 'uncaughtException' })

  // wait until all messages are logged before exiting
  logger.on('finish', () => {
    process.exit(1) // Exit the Node.js process with an error status
  })
})

// Handle Unhandled Rejection:
process.on('unhandledRejection', error => {
  logger.error(error.stack, { service: 'unhandledRejection' })

  // wait until all messages are logged before exiting
  logger.on('finish', () => {
    process.exit(1) // Exit the Node.js process with an error status
  })
})

// set levels  colors for winston logger
logger.setLevels(winston.config.npm.levels)
winston.addColors(winston.config.syslog.colors)

// If we're not in production then log to the `console` with the format:

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  )
}

module.exports = logger
