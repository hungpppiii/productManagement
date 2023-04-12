const {
    DataTypes
} = require('sequelize');
const Customer = require('./Customer.js');
const Store = require('./Store.js');
const Product = require('./Product.js');
const sequelize = require('./../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'order_id',
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'distribution_date',
    },
}, {
    tableName: 'order',
});

Customer.hasMany(Order, {
    foreignKey: 'customer_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Store.hasMany(Order, {
    foreignKey: 'store_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Product.hasOne(Order, {
    foreignKey: 'product_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Order.belongsTo(Customer, {
    foreignKey: 'customer_id'
})

Order.belongsTo(Store, {
    foreignKey: 'store_id'
})

Order.belongsTo(Product, {
    foreignKey: 'product_id'
})

module.exports = Order;