import express from "express"
import { userController } from "../controllers/userController"
import { urlsController } from "../controllers/urlsController"
import { authenticated } from "../middleware/authenticated"
export const routerMap = express.Router()

routerMap.post("/login", userController.login)

routerMap.get("/user", userController.getUser)
routerMap.post("/user", userController.signUp)

routerMap.get("/urls", authenticated, urlsController.getUrls)
routerMap.post("/url", urlsController.createUrl)
