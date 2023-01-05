const { DataTypes } = require("sequelize");

/**
 * @param {import('sequelize').Sequelize} db
 */
module.exports = (db) =>
  db.define(
    "tokenOnuser",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tokenOnuser",
      modelName: "TokenOnUser",
      createdAt: false,
      updatedAt: false,
    }
  );