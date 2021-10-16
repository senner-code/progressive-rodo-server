import {NextFunction, Request, Response} from "express";
import TaskService from '../service/task.service'

class TaskController {
  async add(req: Request, res: Response, next: NextFunction) {

    try {
      const {card_id, title, description, start, deadline, percent} = req.body

      const task = await TaskService.add(card_id, title, description, start, deadline, percent)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }
}

export default new TaskController()