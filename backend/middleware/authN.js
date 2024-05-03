const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userDB = require('../models/userDB')

// ensureAuthenticated

const protect = asyncHandler(async (req, res, next) => {
  let token

  //   console.log(req.user, '\n', req.headers.cookie)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // get user from the token
      req.user = await userDB.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }
})

module.exports = { protect }
