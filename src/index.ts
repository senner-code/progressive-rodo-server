import express from 'express';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname +'/.env' });
import cors from 'cors'
import cookieParser from "cookie-parser";
import UserRouter from './route/user.router';
import AuthMiddleware from './middleware/auth.middleware'
import ErrorMiddleware from './middleware/error.middleware'
import isAuthRouter from "./completed.routes/IsAuth.router";

console.log(process.env.CLIENT_URL)

const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
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