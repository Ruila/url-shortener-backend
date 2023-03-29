import jwt from "jsonwebtoken"
import { LoginRequest } from "../types/request/LoginRequest"
const secretKey = "willmomo"

export const authService = {
  generateJWTToken: (payload: LoginRequest): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "2 days" })
  },
  verifyJWTToken: (token: string): boolean => {
    try {
      const decoded = jwt.verify(token, secretKey)
      console.info("decode result", decoded)
      return true
    } catch (err) {
      console.log("verify error", err)
      return false
    }
  },
}
