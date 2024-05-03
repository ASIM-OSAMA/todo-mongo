const asyncHandler = require('express-async-handler')
const userDB = require('../models/userDB')
const { check, validationResult } = require('express-validator')

const validateUser = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),

  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be EMPTY!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .bail()
    .isStrongPassword({ minLowercase: 1 })
    .withMessage('Password must contain at least 1 LOWERCASE character.')
    .bail()
    .isStrongPassword({ minUppercase: 1 })
    .withMessage('Password must contain at least UPPERCASE character.')
    .bail()
    .isStrongPassword({ minSymbols: 1 })
    .withMessage('Password must contain at least 1 SYMBOL.')
    .bail(),

  //   check('password2')
  //     .custom((value, { req }) => {
  //       return new Promise((resolve, reject) => {
  //         if (req.body.password != value) {
  //           reject(Error('Passwords do not match'))
  //         }
  //         resolve(true)
  //       })
  //     })
  //     .bail(),

  // Check if email is already registered
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail()
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .bail()
    .custom(
      asyncHandler(async email => {
        const userExists = await userDB.findOne({ email })
        if (userExists) {
          throw new Error('E-mail already in use')
        }
      })
    )

    .bail(),
  (req, res, next) => {
    const { name, email, password, bio, profile_picture } = req.body

    const errors = validationResult(req)

    // if an error exist, send the error and keep entered form fields

    if (!errors.isEmpty())
      //   return res.status(422).render('./admin/register', {
      return res.status(422).json({
        errors: errors.array(),
        name,
        email,
        password,
        bio,
        profile_picture
      })

    // if no error exist, proceed (check the route)
    next()
  }
]

module.exports = validateUser
