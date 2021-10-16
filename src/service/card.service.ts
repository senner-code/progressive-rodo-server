import pool from "../db";
import {Card} from "../controller/card.controller";
import ErrorApi from "../exceptions/error.api";

class CardService {
  async add(user_id: number, name: string) {
    try {
      return (await pool.query<Card>(`insert into card (name, admin_id)
                                      values ('${name}', ${user_id})
                                      returning *`)).rows[0]
    } catch (e) {
      throw e
    }
  }

  async remove(card_id: number) {
    let deleted
    try {
      deleted = (await pool.query(`delete
                                   from card
                                   where id = ${card_id}`)).rowCount === 1
    } catch (e) {
      throw e
    }
    if (!deleted) {
      throw ErrorApi.BadRequest('Передан не правильный card_id', [])
    }

    return deleted
  }

  async rename(card_id: number, name: string) {
    try {
      return (await pool.query<Card>(`update card
                                set name='${name}' where id=${card_id} returning *`)).rows[0]
    } catch (e) {
      throw e
    }
  }

}

export default new CardService()