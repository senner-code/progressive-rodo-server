import express from "express";
import CardController from '../controller/card.controller'


const router = express.Router()

router.get('/test',
  CardController.addCard
)

export default router