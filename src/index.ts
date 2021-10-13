import express from 'express';
import UserRouter from './route/user.router';
import AuthMiddleware from './middleware/auth.middleware'
import ErrorMiddleware from './middleware/error.middleware'
import * as dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import cookieParser from "cookie-parser";
import isAuthRouter from "./completed.routes/IsAuth.router";

dotenv.config({
  path: path.resolve(__dirname, '../src/dev.env')
})

const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }
))

app.use(
  isAuthRouter
)

app.use('/user', UserRouter)

app.use(
  // @ts-ignore
  ErrorMiddleware
)

app.listen(process.env.PORT, () => {
  console.log('Server started on port - ', process.env.PORT)
})