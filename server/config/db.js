const {
    Sequelize
} = require('sequelize');

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const port = process.env.DB_PORT

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    port,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;