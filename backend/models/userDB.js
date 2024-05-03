const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    authId: String,
    name: {
      type: String,
      required: [true, 'Enter your name.']
    },
    email: {
      type: String,
      required: [true, 'Enter your email address.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Enter your your password.']
    },
    role: {
      type: String
      // required: [true, 'Specify the role.']
    },
    bio: String,
    picture: String,
    numberOfTasks: {
      type: Number
      // required: [true, 'Number of tasks count.']
    },
    linkedAccounts: String,
    created: Date
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('User', userSchema)
module.exports = User
