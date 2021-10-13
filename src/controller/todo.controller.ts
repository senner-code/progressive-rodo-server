import {NextFunction, Request, Response} from "express";

class TodoController {
  async addTodo(req: Request, res: Response, next: NextFunction){
    return res.json('Todo OK')
  }
}

export default new TodoController()