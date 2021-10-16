import Router from 'express'
import TaskController from '../controller/task.controller'


const router = Router()

router.get('/add', TaskController.add)

export default router