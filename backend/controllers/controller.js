const { error } = require('console')
const todo = require('../models/DBmodel.js')
const asyncHandler = require('express-async-handler')

const getTodos = asyncHandler(async (req, res) => {
  await todo
    .find({})
    .then(result => res.status(200).json({ result }))
    .catch(error => res.status(500).json({ msg: error }))
})
// Add a condition, if no todo (result) available , send a message:
// 'No tasks TODO yet!, Please POST a task TODO.'

const getTodo = asyncHandler(async (req, res) => {
  await todo
    .findOne({ _id: req.params.todoID })
    .then(result => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Todo not found' }))
})

const createTodo = asyncHandler(async (req, res) => {
  await todo
    .create(req.body)
    .then(result => res.status(200).json({ result }))
    .catch(error => res.status(500).json({ msg: error }))
})

const updateTodo = asyncHandler(async (req, res) => {
  await todo
    .findOneAndUpdate({ _id: req.params.todoID }, req.body, {
      new: true,
      runValidators: true
    })
    .then(result => res.status(200).json({ result }))
    .catch(error => res.status(404).json({ msg: 'Todo not found' }))
})

const deleteTodo = asyncHandler(async (req, res) => {
  const todoResult = await todo.findOneAndDelete({ _id: req.params.todoID })
  if (!todoResult) {
    res.status(404)
    throw new Error('Todo not found')
  } else {
    res.status(200).json({
      msg: `TODO with id '${req.params.todoID}' successfully deleted!`
    })
  }
})

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}
