const express = require('express')
const router = express.Router()
const todocontroller = require('../controllers/todocontroller')




//declare the api end points here

router.get('/', todocontroller.listtodos) // get the list of the todos
router.post('/',todocontroller.createtodo) //  for creating a new todo
router.get('/:id',todocontroller.readtodo) // for reading a particular todo
router.put('/:id',todocontroller.updateTodo) // for updating a particular todo
router.delete('/:id',todocontroller.deleteTodo) // deleting a todo


module.exports = router