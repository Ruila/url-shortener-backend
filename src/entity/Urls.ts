import { DataTypes } from "sequelize"
import { sequelizeInstance } from "../config/sequelizeInstance"
export const Urls = sequelizeInstance.define(
  "Urls",
  {
    shorten_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    origin_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    created_by: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: false,
    },
    viewed: {
      type: DataTypes.NUMBER,
      allowNull: true,
      unique: false,
    },
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
    tableName: "urls",
  }
)
