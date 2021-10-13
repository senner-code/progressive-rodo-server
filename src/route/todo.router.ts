import Router from 'express'
import TodoController from '../controller/todo.controller'


const router = Router()

router.get('/test', TodoController.addTodo)

export default router