import express from "express";
import CardRouter from '../route/card.router'
import TaskRouter from '../route/task.router'
import UserRouter from '../route/user.authorized.router'


const isAuthRouter = express()

isAuthRouter.use('/card', CardRouter)

isAuthRouter.use('/task', TaskRouter)

isAuthRouter.use('/user', UserRouter)

export default isAuthRouter