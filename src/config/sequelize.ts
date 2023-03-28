import { Sequelize } from "sequelize"

export const sequelizeInstance = new Sequelize(
  "postgres://user:password@postgres:5433/url_shortener_db"
)
