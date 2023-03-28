import express from "express"
import { User } from "./entity/User"
import { sequelizeInstance } from "./config/sequelize"
const app = express()
const port = 5000

async function check() {
  try {
    console.info("123")
    await sequelizeInstance.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

app.get("/", async (req, res) => {
  // const result = await User.findAll()
  // await check()
  res.send("Hello 123ddcccdWorld!ddd")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
