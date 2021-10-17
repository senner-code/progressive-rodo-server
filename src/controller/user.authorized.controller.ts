import {NextFunction, Request, Response} from "express";
import UserAuthorizedService from '../service/user.authorized.service'
import {validationResult} from "express-validator";


class UserAuthorizedController {

  async changeName(req: Request, res: Response, next: NextFunction) {
    try {
      const {user_id, name} = req.body

      const user = await UserAuthorizedService.changeName(user_id, name)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.json(errors)
      }
      const {user_id, password} = req.body

      const user = await UserAuthorizedService.changePassword(user_id, password)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.json(errors)
      }
      const {user_id, email} = req.body

      const user = await UserAuthorizedService.changeEmail(user_id, email)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

}

export default new UserAuthorizedController()