// const getTodo = (req, res) => {
//   res.status(200).json('OK')
// }
const express = require('express')
const router = express.Router()
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/controller')

router.route('/').get(getTodos)

router.get('/:todoID', getTodo)

router.post('/', createTodo)

router.put('/:todoID', updateTodo)

router.delete('/:todoID', deleteTodo)

module.exports = router
