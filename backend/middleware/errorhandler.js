const errorHandler = (err, req, res, next) => {
  // assign the value of res.statusCode (if available) to statusCode if not, assign 500 to statusCode.
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: err.stack
  })
}

module.exports = {
  errorHandler
}
