import express from "express"
import { SignUpRequest } from "../types/request/SignUpRequest"

export const userController = {
  getUser: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    try {
      res.status(200).send("getUser")
    } catch (err) {
      next(err)
    }
  },
  signUp: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const { name, password } = req.body as SignUpRequest
      res.status(200).send(name + password)
    } catch (err) {
      next(err)
    }
  },
}
