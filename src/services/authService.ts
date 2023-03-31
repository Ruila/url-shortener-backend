import jwt from "jsonwebtoken"
import { LoginRequest } from "../types/request/LoginRequest"
const secretKey = "willmomo"

export const authService = {
  generateJWTToken: (payload: LoginRequest): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "2 days" })
  },
  verifyJWTToken: (token: string): boolean => {
    try {
      jwt.verify(token, secretKey)
      return true
    } catch (err) {
      console.log("verify error", err)
      return false
    }
  },
}
