const {
    DataTypes
} = require('sequelize');
const Factory = require('./Factory.js');
const ProductLine = require('./ProductLine.js');
const sequelize = require('./../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'product_id',
    },
    productLineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_line_id',
    },
    productionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'production_date',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'product',
});

Factory.hasMany(Product, {
    foreignKey: 'factory_id',
    allowNull: false,
})

ProductLine.hasMany(Product, {
    foreignKey: 'product_line_id',
    allowNull: false,
})

Product.belongsTo(ProductLine, {
    foreignKey: 'factory_id',
    allowNull: false,
})

Product.belongsTo(Factory, {
    foreignKey: 'factory_id',
    allowNull: false,
})


module.exports = Product;