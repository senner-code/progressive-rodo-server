import {UserRes} from "../controller/user.controller";
import jwt from 'jsonwebtoken'
import pool from "../db";


class TokenService {
  generateTokens<T>(payload: UserRes) {
    try {
      const refreshToken = jwt.sign(payload, String(process.env.REFRESH_TOKEN), {expiresIn: '30d'})
      const accessToken = jwt.sign(payload, String(process.env.ACCESS_TOKEN), {expiresIn: '30m'})
      return {
        accessToken,
        refreshToken,
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  };

  async saveToken<T>(refreshToken: string, user_id: number) {
    try {
      const candidate = (await pool.query(`select *
                                           from token
                                           where user_id = ${user_id}`)).rowCount === 1
      if (candidate) {
        return (await pool.query(`update token
                                  set refresh_token='${refreshToken}'
                                  where user_id = ${user_id}`))
      }

      return (await pool.query(`insert into token (refresh_token, user_id)
                                VALUES ('${refreshToken}', ${user_id})`))

    } catch (e) {
      console.log(e)
      throw e
    }
  }

  validateAccessToken(accessToken: string) {
    try{
      return JSON.parse(JSON.stringify(jwt.verify(accessToken, String(process.env.ACCESS_TOKEN))))
    }catch (e) {
      return false
    }

  }

  validateRefreshToken(refreshToken: string) {
    try{
      return JSON.parse(JSON.stringify(jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN))))
    }catch (e) {
      return false
    }

  }

}

export default new TokenService()