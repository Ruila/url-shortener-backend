import { DataTypes } from "sequelize"
import { sequelizeInstance } from "../config/sequelizeInstance"

export const User = sequelizeInstance.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "accounts",
  }
)
