const Sequelize = require("sequelize");

/**
 * @type {import('sequelize').Sequelize}
 */
const db = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
  }
);

db.authenticate()
  .then(() =>
    console.log(
      "\nConnection to the database has been established successfully.\n"
    )
  )
  .catch((error) =>
    console.error("\nUnable to connect to the database:", error)
  );

module.exports = db;