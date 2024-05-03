const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getLoggedInUser
} = require('../controllers/user.controller')
const { protect } = require('../middleware/authN')
const validateUser = require('../validation/registerValidator')

router.post('/', validateUser, registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getLoggedInUser)

module.exports = router
