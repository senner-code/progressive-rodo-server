import express from "express";
import CardRouter from '../route/card.router'
import TodoRouter from '../route/todo.router'

const isAuthRouter = express()

isAuthRouter
  .use(
  '/card',
  CardRouter
  )
  .use(
    '/todo',
    TodoRouter
  )

export default isAuthRouter