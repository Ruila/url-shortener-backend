import express from "express"
import { userController } from "../controllers/userController"
import { urlsController } from "../controllers/urlsController"

export const routerMap = express.Router()

routerMap.post("/login", userController.login)

routerMap.get("/user", userController.getUser)
routerMap.post("/user", userController.signUp)

routerMap.get("/urls", urlsController.getUrls)
routerMap.post("/url", urlsController.createUrl)
