import pool from "../db";
import {UserRes} from "../controller/user.controller";
import bcrypt from "bcrypt";

class UserAuthorizedService {
  async changeName(user_id: number, name: string) {
    try {
      return (await pool.query<UserRes>(`update users
                                         set name = '${name}'
                                         where id = ${user_id}
                                         returning *`)).rows[0]
    } catch (e) {
      throw e
    }

  }

  async changePassword(user_id: number, password: string) {
    try {
      const hashPassword = bcrypt.hash(password, 3)

      return (await pool.query<UserRes>(`update users
                                         set password = '${hashPassword}'
                                         where id = ${user_id}
                                         returning *`)).rows[0]
    } catch (e) {
      throw e
    }

  }

  async changeEmail(user_id: number, email: string) {
    try {
      return (await pool.query<UserRes>(`update users
                                         set email = '${email}'
                                         where id = ${user_id}
                                         returning *`)).rows[0]
    } catch (e) {
      throw e
    }

  }
}


export default new UserAuthorizedService()