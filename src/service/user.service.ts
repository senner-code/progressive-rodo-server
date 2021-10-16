import pool from "../db";
import {UserReq, UserRes} from "../controller/user.controller";
import TokenService from './token.service'
import UserDto from "../dto/user.dto";
import bcrypt from 'bcrypt'
import {checkUserCandidate} from "../utils/db.utils";
import ErrorApi from "../exceptions/error.api";


class UserService {

  async registration<T>(email: string, password: string, name: string | undefined) {

    const candidate = await checkUserCandidate<boolean>(email)
    if (candidate) {
      throw 'Зарегистрирован'
    }

    try {
      const hashPass = await bcrypt.hash(password, 3)
      const user = (await pool.query<UserRes>(`insert into public.users (name, email, password)
                                               values ($1, $2, $3)
                                               returning *`, [name, email, hashPass])).rows[0]
      const userDto = new UserDto(user)

      const tokens = TokenService.generateTokens<UserRes>({...userDto})

      return {
        user:userDto,
        tokens
      }
    } catch (e) {
      throw e
    }
  }

  async login<T>(email: string, password: string) {

    const candidate = await checkUserCandidate<boolean>(email)

    if (!candidate) {
      throw 'Неверные данные или пароль'
    }

    const user = (await pool.query<UserRes & UserReq>(`select *
                                                       from public.users
                                                       where email = '${email}'`)).rows[0]

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
      throw 'Неверные данные или пароль'
    }
    try {
      const userDto = new UserDto(user)

      const tokens = TokenService.generateTokens({...userDto})

      await TokenService.saveToken<boolean>(tokens.refreshToken, user.id)

      return {
        user:userDto,
        tokens
      }
    } catch (e) {
      console.log(e)
      throw e
    }

  }

  async refresh<T>(refreshToken: string) {
    const validate: UserRes = TokenService.validateRefreshToken(refreshToken)
    if (!validate) {
      throw ErrorApi.UnauthorizedError()
    }
    try{
      console.log('Here')
      const user = new UserDto((await pool.query<UserRes>(`select *
                                                         from users
                                                         where id = ${validate.id}`)).rows[0])
      console.log(user)
      const tokens = TokenService.generateTokens({...user})

      await TokenService.saveToken(tokens.refreshToken,user.id)

      return {
        user,
        tokens
      }
    }catch (e) {
      console.log(e)
      throw e
    }

  }
}

export default new UserService()