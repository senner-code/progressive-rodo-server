import pool from "../db";

class TaskService {

  async add(card_id: number, title: string, description: string | null, start: string | null, deadline: string | null, percent: number | null) {
    try {
      return (await pool.query(`insert into task (card_id, title, description, start, deadline, percent, completed)
                                VALUES (${card_id}, ${title}, ${description}, ${start}, ${deadline}, ${percent},
                                        ${false})
                                returning *`)).rows[0]
    } catch (e) {
      throw e
    }
  }

}

export default new TaskService()