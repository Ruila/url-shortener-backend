import express from "express"
import { authService } from "../services/authService"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"

export const authenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    const verifyResult = authService.verifyJWTToken(token)
    if (verifyResult) await next()
    else res.status(401).send(ErrorCodeMap.UNAUTHORIZED)
  } else res.status(401).send(ErrorCodeMap.UNAUTHORIZED)
}
