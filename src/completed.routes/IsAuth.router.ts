import express from "express";
import CardRouter from '../route/card.router'
import TaskRouter from '../route/task.router'

const isAuthRouter = express()

isAuthRouter
  .use(
  '/card',
  CardRouter
  )

isAuthRouter.use(
  '/task',
  TaskRouter
)

export default isAuthRouter