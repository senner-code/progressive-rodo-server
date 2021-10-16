import {NextFunction, Request, Response} from "express";
import ErrorApi from "../exceptions/error.api";

export interface apiError {
  status: number,
  message: string,
  errors?: any[]
}


export default (err: apiError, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof ErrorApi) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json({message: 'Server Error', errors:[err]})
}