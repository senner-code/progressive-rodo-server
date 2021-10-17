import {NextFunction, Request, Response} from "express";
import CardService from '../service/card.service'

export interface Card {
  id: number,
  user_id: number,
  name: string
}


class CardController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.params.user_id

      const cards: Card[] = await CardService.getAll(Number(user_id))

      return res.json(cards)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const card_id = req.params.card_id

      const card:Card = await CardService.getOne(Number(card_id))

      return res.json(card)
    } catch (e) {
      next(e)
    }
  }

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