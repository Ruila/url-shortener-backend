import express from "express"
import { userController } from "../controllers/userController"

export const routerMap = express.Router()

routerMap.get("/user", userController.getUser)
routerMap.post("/user", userController.signUp)
