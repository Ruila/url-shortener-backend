import { Sequelize } from "sequelize"

export const sequelizeInstance = new Sequelize({
  database: "url_shortener_db",
  username: "user",
  password: "password",
  host: "postgres",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
})
