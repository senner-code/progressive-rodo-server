import express from "express";
import CardController from '../controller/card.controller'


const router = express.Router()

router.get('/get_all/:user_id', CardController.getAll)
router.get('/get_one/:card_id', CardController.getOne)
router.get('/remove/:card_id', CardController.remove)
router.post('/add', CardController.add)
router.post('/rename', CardController.rename)





export default router