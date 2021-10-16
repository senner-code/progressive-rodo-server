import express from "express";
import CardController from '../controller/card.controller'


const router = express.Router()

router.post('/add',
  CardController.add
)
router.get('/remove/:card_id',
  CardController.remove
)

router.post('/rename',
  CardController.rename
)





export default router