const { Sequelize } = require("sequelize");

const host = process.env.HOST;
const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
