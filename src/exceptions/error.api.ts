import {apiError} from "../middleware/error.middleware";

class ErrorApi extends Error {

  errors?: any[] = []
  status: number


  constructor(model: apiError) {
    super(model.message)
    this.errors = model.errors
    this.status = model.status
  }


  static UnauthorizedError() {
    return new ErrorApi({status: 401, message:'Не авторизованный пользователь', errors: []})
  }

  static BadRequest(message: string, errors: any[]){
    return new ErrorApi({status: 401, message, errors})
  }

  static ServerError(){
    return new ErrorApi({status: 500, message: 'Server Error', errors: []})
  }

}

export default ErrorApi