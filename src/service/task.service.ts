import pool from "../db";
import ErrorApi from "../exceptions/error.api";
import {Task} from "../controller/task.controller";

class TaskService {

  async add(card_id: number, title: string, description: string | null, start: string | null, deadline: string | null, percent: number | null) {
    try {
      return (await pool.query<Task>(`insert into task (card_id, title, description, start, deadline, percent, completed)
                                VALUES (${card_id}, '${title}', '${description}', '${start}', '${deadline}', ${percent},
                                        ${false})
                                returning *`)).rows[0]
    } catch (e) {
      throw e
    }
  }

  async remove(task_id: number) {
    let deleted:boolean
    try {
      deleted = (await pool.query(`delete
                                   from task
                                   where id = ${task_id}`)).rowCount === 1
    } catch (e) {
      throw e
    }
    if (!deleted) {
      throw ErrorApi.BadRequest('Передан не правильный task_id', [])
    }

    return deleted
  }

  async changeTitle(task_id: number, title: string) {
    try {
      return (await pool.query<Task>(`update task
                                set title='${title}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async changeDescription(task_id: number, description: string) {
    try {
      return (await pool.query<Task>(`update task
                                set description='${description}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }

  async changeStart(task_id: number, start: string) {
    try {
      return (await pool.query<Task>(`update task
                                set start='${start}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }

  async changeDeadline(task_id: number, deadline: string) {
    try {
      return (await pool.query<Task>(`update task
                                set deadline='${deadline}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }

  async changeComplete(task_id: number, status: boolean) {
    try {
      return (await pool.query<Task>(`update task
                                set completed='${status}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }

  async changeCard(task_id: number, card_id: number) {
    try {
      return (await pool.query<Task>(`update task
                                set card_id='${card_id}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }
  async changePercent(task_id: number, percent: number) {
    try {
      return (await pool.query<Task>(`update task
                                set percent='${percent}'
                                where id = ${task_id}
                                returning *`)).rows[0]

    } catch (e) {
      throw e
    }
  }


}

export default new TaskService()