const { error } = require('console')
const todo = require('../models/todoDB.js')
const asyncHandler = require('express-async-handler')

// Get all tasks
const getTodos = asyncHandler(async (req, res) => {
  try {
    const result = await todo.find({})
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})
// Add a condition, if no todo (result) available , send a message:
// 'No tasks TODO yet!, Please POST a task TODO.'

const getTodo = asyncHandler(async (req, res) => {
  try {
    const result = await todo.findOne({ _id: req.params.todoID })
    console.log('result: ', result)
    res.status(200).json({ result })
  } catch (err) {
    console.log(err)
    res.json({ error: err })
    // .catch(() => res.status(404).json({ msg: `Todo not found` }))
  }
})

// Add todo
const createTodo = asyncHandler(async (req, res) => {
  await todo
    .create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      todo: req.body.todo,
      done: req.body.done,
      user: req.body.user
    })
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
