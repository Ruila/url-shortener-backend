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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "users",
  }
)
