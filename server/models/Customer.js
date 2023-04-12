const {
    DataTypes
} = require('sequelize');
const sequelize = require('./../config/db');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'customer_id',
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'customer_name'
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'customer',
});

module.exports = Customer;