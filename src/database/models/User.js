const { DataTypes } = require("sequelize");

/**
 * @param {import('sequelize').Sequelize} db
 */
module.exports = (db) =>
  db.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      modelName: "User",
      createdAt: false,
      updatedAt: false,
    }
  );