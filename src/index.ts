import express from "express"
import { sequelizeInstance } from "./config/sequelizeInstance"
const app = express()
const port = 5000
import { routerMap } from "./routes"
import cors from "cors"

sequelizeInstance
  .sync()
  .then(() => {
    console.log("Synced db.")
  })
  .catch(err => {
    console.log("Failed to sync db: " + err.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api", routerMap)

app.get("/", async (req, res) => {
  res.send("Hello 123ddcccdWorld!ddd")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
