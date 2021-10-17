import express from "express";
import UserAuthorizedController from '../controller/user.authorized.controller'
import {body} from "express-validator";

const router = express.Router()

router.post(
  '/change_email',
  body('email').isEmail(),
  UserAuthorizedController.changeEmail
)
router.post(
  '/change_password',
  body('password').isLength({min: 5, max: 32}),
  UserAuthorizedController.changePassword
)
router.post(
  '/change_name',
  body('name').isLength({min: 5, max: 32}),
  UserAuthorizedController.changeName
)

export default router