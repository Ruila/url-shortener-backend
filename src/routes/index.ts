import express from "express"
import { userController } from "../controllers/userController"
import { urlsController } from "../controllers/urlsController"
import { authenticated } from "../middleware/authenticated"
export const routerMap = express.Router()

routerMap.post("/login", userController.login)

routerMap.post("/user", userController.signUp)

routerMap.post("/urls", authenticated, urlsController.getUrls)
routerMap.post("/url", authenticated, urlsController.createUrl)
routerMap.delete("/url/:urlId", authenticated, urlsController.deleteUrl)
