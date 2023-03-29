import express from "express"
import { SignUpRequest } from "../types/request/SignUpRequest"
import { User } from "../entity/User"
import { LoginRequest } from "../types/request/LoginRequest"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"

export const userController = {
  getUser: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      res.status(200).send("getUser")
    } catch (err) {
      next(err)
    }
  },
  signUp: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { name, password } = req.body as SignUpRequest
      await User.create({
        name,
        password,
      }).then(() => {
        res.status(200).send("successfully")
      })
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
  login: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { name, password } = req.body as LoginRequest
      const findUser = await User.findOne({ where: { name: name } })
      if (findUser) {
        const parseData = findUser.get({ plain: true })
        if (parseData.password === password) res.status(200).send(parseData)
        else res.status(417).send(ErrorCodeMap.PASSWORD_ERROR)
      } else {
        res.status(417).send(ErrorCodeMap.NOT_SIGN_UP_YET)
      }
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
