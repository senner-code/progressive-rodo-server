import Router from 'express'
import TaskController from '../controller/task.controller'


const router = Router()

router.post('/add', TaskController.add)
router.get('/remove/:id',TaskController.remove)
router.post('/change_title', TaskController.changeTitle)
router.post('/change_description', TaskController.changeDescription)
router.post('/change_complete', TaskController.changeComplete)
router.post('/change_start', TaskController.changeStart)
router.post('/change_deadline', TaskController.changeDeadline)
router.post('/change_percent', TaskController.changePercent)
router.post('/change_card', TaskController.changeCard)


export default router