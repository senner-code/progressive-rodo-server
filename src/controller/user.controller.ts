import {validationResult} from "express-validator";
import UserService from '../service/user.service'
import {NextFunction, Request, Response} from "express";


export interface User {
  email: string,
}

export interface UserRes extends User {
  name: string,
  id: number
  accessToken?: string,
  refreshToken?: string
}


export interface UserReq extends User {
  name?: string,
  password: string
}


class UserController {
  async registration(req: Request<{}, {}, UserReq>, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.json(errors)
      }
      const {email, name, password} = req.body
      const user = await UserService.registration<User>(email, password, name)
      return res.json(user)

    } catch (e) {
      console.log(e)
      next(e)
    }
  }

  async login(req: Request<{}, {}, UserReq>, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body
      const user = await UserService.login(email, password)
      res.cookie('refreshToken', user.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies
      const user = await UserService.refresh<UserRes>(refreshToken)
      res.cookie('refreshToken', user.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(user)
    } catch (e) {

      next(e)
    }
  }
}


export default new UserController()