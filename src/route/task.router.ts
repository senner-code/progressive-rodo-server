import Router from 'express'
import TaskController from '../controller/task.controller'


const router = Router()


router.get('/remove/:id',TaskController.remove)
router.get('/get_all/:card_id', TaskController.getAll)
router.get('/get_one/:task_id', TaskController.getOne)
router.post('/add', TaskController.add)
router.post('/change_title', TaskController.changeTitle)
router.post('/change_description', TaskController.changeDescription)
router.post('/change_complete', TaskController.changeComplete)
router.post('/change_start', TaskController.changeStart)
router.post('/change_deadline', TaskController.changeDeadline)
router.post('/change_percent', TaskController.changePercent)
router.post('/change_card', TaskController.changeCard)


export default router