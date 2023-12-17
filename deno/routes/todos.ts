import {  Router } from "https://deno.land/x/oak/mod.ts"
import { Todo } from '../models/todo.ts'

let todos: Todo[] = []

const router = new Router();

router.get("/todo", (ctx) => {
    ctx.response.body = { todos: todos }
})

router.post("/todo", async (ctx) => {
    const data = await ctx.request.body().value
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    }
    todos.push(newTodo)
    ctx.response.body = { message:'Created todo',todo: newTodo, todos: todos }
    ctx.response.status = 201
})

router.put("/todo/:todoId", async (ctx) => {
    const params = ctx.params
    const data = await ctx.request.body().value

    const tId = params.todoId


    const todoIndex = todos.findIndex(todoItem => todoItem.id === tId)
    if(todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: data.text
        }
        return ctx.response.body = { message:'Updated todo', todos: todos }

    }
    ctx.response.body = { message: 'Could not find todo for this id.' }
    ctx.response.status = 404
}) 
router.delete("/todo/:todoId", (ctx) => {
    const params = ctx.params

    const tId = params.todoId
    todos = todos.filter(todoItem => todoItem.id !== tId)
    ctx.response.body = { message:'Deleted todo', todos: todos }
})  

export default router 