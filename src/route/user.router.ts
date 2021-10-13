import express from "express";
import UserController from '../controller/user.controller'
import {body} from "express-validator";

const router = express.Router()


router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 35}),
  body('name').isLength({min: 4, max: 30}),
  UserController.registration
)
router.post('/login',
  UserController.login
)

router.get('/refresh',
  UserController.refresh
)
export default router