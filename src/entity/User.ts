import { DataTypes } from "sequelize"
import { sequelizeInstance } from "../config/sequelize"

export const User = sequelizeInstance.define("User", {
  name: DataTypes.STRING,
})
