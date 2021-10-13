import {NextFunction, Request, Response} from "express";
import TokenService from '../service/token.service'

export default (req: Request, res: Response, next: NextFunction) => {

  try{
    const authHeader = req.headers.authorization

    if (!authHeader) return res.json('Не авторизован!')


    const accessToken = authHeader.split(' ')[1]

    if (!accessToken) return res.json('Не Верный токен!')

    const userData = TokenService.validateAccessToken(accessToken)

    if(!userData) return res.json('Не Верный токен или Токен доступа умер!')


  }catch (e) {
    next(e)
  }
}