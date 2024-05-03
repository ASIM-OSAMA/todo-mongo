const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userDB = require('../models/userDB')

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    picture,
    numberOfTasks,
    linkedAccounts
  } = req.body

  // if (!name || !email || !password) {
  //   res.status(400)
  //   throw new Error('Please add all fields')
  // }

  // // check if user exists
  // const userExists = await User.findOne({ email })
  // if (userExists) {
  //   res.status(400)
  //   throw new Error('User already exists')
  // }

  // create hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await userDB.create({
    name,
    email,
    password: hashedPassword,
    role,
    picture,
    numberOfTasks,
    linkedAccounts
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check for user email
  const user = await userDB.findOne({ email })
  const hash = await bcrypt.compare(password, user.password)
  if (user && hash) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Get logged user data

const getLoggedInUser = asyncHandler(async (req, res) => {
  // console.log(`getLoggedInUser: ${req.user}`)
  const { _id, name, email } = await userDB.findById(req.user.id)
  res.status(200).json({
    id: _id,
    name,
    email,
    text: 'You are Logged!'
  })
})

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser
}

//   // CHANGE THIS FILE NAME TO registerController.js

// const asyncHandler = require('express-async-handler')
// const pool = require('../config/db')
// const bcrypt = require('bcryptjs')

// // Register form handling

// // const register = asyncHandler(async (req, res) => {
// const register = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err

//     const {
//       firstname,
//       lastname,
//       username,
//       email,
//       password,
//       bio,
//       user_picture
//     } = req.body

//     // Hashing password
//     bcrypt.genSalt(10, function (err, salt) {
//       bcrypt.hash(password, salt, function (err, hash) {
//         if (err) throw err
//         // console.log(hash)
//         hashed_password = hash

//         // Store hashed_password in DB.

//         connection.query(
//           'INSERT INTO `users` SET `user_firstname` = ? , `user_lastname` =? , user_username=?, user_email=?, user_password=?, user_bio=?, user_picture=?',
//           [
//             firstname,
//             lastname,
//             username,
//             email,
//             hashed_password,
//             bio,
//             user_picture
//           ],
//           (err, rows) => {
//             connection.release() // return the connection to pool
//             if (!err) {
//               req.flash(
//                 'success_msg',
//                 `You are now registered ${firstname}, Login to continue.`
//               )
//               res.status(302).redirect('login')
//               // console.log(`${firstname} has been added.`)
//             } else {
//               console.log(err)
//             }

//             // console.log('ERROR_4')
//           }
//         )
//       })
//     })
//   })
// }

// module.exports = {
//   register
// }
