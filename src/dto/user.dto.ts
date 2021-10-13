import {UserRes} from "../controller/user.controller";

export default class UserDto {
  email
  id
  name

  constructor(model: UserRes) {
    this.email = model.email
    this.id = model.id
    this.name = model.name
  }
}