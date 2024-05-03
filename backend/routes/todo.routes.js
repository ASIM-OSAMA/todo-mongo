const express = require('express')
const router = express.Router()
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller')

router.route('/').get(getTodos).post(createTodo)

router.get('/:todoID', getTodo)

// router.post('/', createTodo)

router.route('/:todoID').put(updateTodo).delete(deleteTodo)

// router.delete('/:todoID', deleteTodo)

module.exports = router
