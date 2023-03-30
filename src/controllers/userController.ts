import express from "express"
import { SignUpRequest } from "../types/request/SignUpRequest"
import { User } from "../entity/User"
import { LoginRequest } from "../types/request/LoginRequest"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"
import { authService } from "../services/authService"
import { UserEntity } from "../types/entity/UserEntity"

export const userController = {
  signUp: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { name, password } = req.body as SignUpRequest
      await User.create({
        name,
        password,
      }).then(response => {
        res.status(200).send(response.get({ plain: true }))
      })
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
  login: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { name, password } = req.body as LoginRequest
      const findUser = (await User.findOne({
        where: { name: name },
        raw: true,
      })) as UserEntity | null
      if (findUser) {
        if (findUser.password === password) {
          const generateToken = authService.generateJWTToken(findUser)
          res.status(200).send({
            ...findUser,
            accessToken: generateToken,
          })
        } else res.status(417).send(ErrorCodeMap.PASSWORD_ERROR)
      } else {
        res.status(417).send(ErrorCodeMap.NOT_SIGN_UP_YET)
      }
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
