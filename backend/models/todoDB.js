const mongoose = require('mongoose')
const User = require('./userDB')

const todoSchema = new mongoose.Schema(
  {
    // ownerId:mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, 'Please add a title for todo.']
    },
    subtitle: String
    ,
    todo: {
      type: String,
      required: [true, 'Please add a todo.']
    },
    done: {
      type: String,
      required: [true, 'Please add a status.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const todo = mongoose.model('Todo', todoSchema)

module.exports = todo

// module.exports = {
//   todo,
//   getUserById: async id => User.findById(id),
//   getUserByAuthId: async authId => User.findOne({ authId }),
//   addUser: async data => new User(data).save()
// }
