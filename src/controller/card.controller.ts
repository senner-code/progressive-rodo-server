import {NextFunction, Request, Response} from "express";
import CardService from '../service/card.service'

export interface Card {
  id: number,
  user_id: number,
  name: string
}


class CardController {

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const {user_id, name} = req.body

      const card = await CardService.add(user_id, name)

      return res.json(card)
    } catch (e) {
      next(e)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const card_id = req.params.card_id
      const deleted = await CardService.remove(Number(card_id))
      return res.json(deleted)
    } catch (e) {
      next(e)
    }
  }

  async rename(req: Request, res: Response, next: NextFunction) {
    try {
      const {card_id, name} = req.body
      const card = await CardService.rename(card_id, name)
      return res.json(card)
    } catch (e) {
      next(e)
    }
  }

}

export default new CardController()