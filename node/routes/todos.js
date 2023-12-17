const express = require('express')

const router = express.Router()
let todos = []
router.get('/todo', (req, res, next) => {
    res.status(200).json({ todos: todos })
})

router.post('/todo', (req, res, next) => {
    const newTodo = { id: new Date().toISOString(), title: req.body.title }
    todos.push(newTodo)
    res.status(201).json({ message:'Created todo',todo: newTodo, todos: todos })
})

router.put('/todo/:todoId', (req, res, next) => {
    const tId = req.params.todoId
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tId)
    if(todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            title: req.body.title
        }
        return res.status(200).json({ message:'Updated todo', todos: todos })

    }
    res.status(404).json({ message: 'Could not find todo for this id.' })
    
})

router.delete('/todo/:todoId', (req, res, next) => {

    const tId = req.params.todoId
    todos = todos.filter(todoItem => todoItem.id !== tId)
    res.status(200).json({ message:'Deleted todo', todos: todos })
})

module.exports = router