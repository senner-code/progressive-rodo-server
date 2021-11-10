import express from 'express';
import path from "path";

import * as dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, '../src/development.env')
})
import cors from 'cors'
import cookieParser from "cookie-parser";
import UserRouter from './route/user.router';
import AuthMiddleware from './middleware/auth.middleware'
import ErrorMiddleware from './middleware/error.middleware'


import isAuthRouter from "./completed.routes/IsAuth.router";




const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200
  }
))




app.use('/user', UserRouter)

app.use(
  '/auth',
  AuthMiddleware,
  isAuthRouter
)


app.use(ErrorMiddleware)



app.listen(process.env.PORT, async () => {
  console.log('Server started on port - ', process.env.PORT)
}
)