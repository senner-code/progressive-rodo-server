import {NextFunction, Request, Response} from "express";

class CardController {

  async addCard(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json('Hello')
    }catch (e) {
      res.json(e)
    }
  }

}

export default new CardController()