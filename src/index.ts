import express from "express"
import { sequelizeInstance } from "./db/sequelizeInstance"
import { routerMap } from "./routes"
import cors from "cors"
import { urlsController } from "./controllers/urlsController"
import { runRedis } from "./db/redis"

const app = express()
const port = 5000

sequelizeInstance
  .sync()
  .then(() => {
    console.log("Synced db.")
  })
  .catch(err => {
    console.log("Failed to sync db: " + err.message)
  })

runRedis()

app.use(cors())
app.use(express.json())
app.use("/api", routerMap)

app.get("/", async (req, res) => {
  res.send("Hello World!!")
})

app.get("/:shorten_url", urlsController.redirectUrl)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
