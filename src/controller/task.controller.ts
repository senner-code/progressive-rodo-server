import {NextFunction, Request, Response} from "express";
import TaskService from '../service/task.service'

export interface Task {
  id: number,
  card_id: number,
  title: string,
  start: string | null,
  deadline: string | null,
  completed: boolean,
  percent: string | null,
  description: | null
}

class TaskController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const card_id = req.params.card_id

      const tasks: Task[] = await TaskService.getAll(Number(card_id))

      return res.json(tasks)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const task_id = req.params.task_id

      const task: Task = await TaskService.getOne(Number(task_id))

      return res.json(task)
    } catch (e) {
      next(e)
    }
  }


  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const {card_id, title, description, start, deadline, percent} = req.body
      const task = await TaskService.add(card_id, title, description, start, deadline, percent)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const task_id = req.params.id
      const deleted = await TaskService.remove(Number(task_id))
      return res.json(deleted)
    } catch (e) {
      next(e)
    }

  }

  async changeTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, title} = req.body
      const task = await TaskService.changeTitle(task_id, title)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changeDescription(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, description} = req.body
      const task = await TaskService.changeDescription(task_id, description)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changeStart(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, start} = req.body
      const task = await TaskService.changeStart(task_id, start)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changeDeadline(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, deadline} = req.body
      const task = await TaskService.changeDeadline(task_id, deadline)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changeComplete(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, completed} = req.body
      const task = await TaskService.changeComplete(task_id, completed)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changePercent(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, percent} = req.body
      const task = await TaskService.changePercent(task_id, percent)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

  async changeCard(req: Request, res: Response, next: NextFunction) {
    try {
      const {task_id, card_id} = req.body
      const task = await TaskService.changeCard(task_id, card_id)
      return res.json(task)
    } catch (e) {
      next(e)
    }

  }

}

export default new TaskController()