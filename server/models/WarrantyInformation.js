const {
    DataTypes
} = require('sequelize');
const Product = require('./Product.js');
const Guarantee = require('./Guarantee.js');
const Customer = require('./Customer.js');
const sequelize = require('./../config/db');

const WarrantyInformation = sequelize.define('WarrantyInformation', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    warrantyStartTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'warranty_start_time',
    },
    warrantyEndTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'warranty_end_time',
    },
}, {
    tableName: 'warranty_information',
});

Product.hasMany(WarrantyInformation, {
    foreignKey: 'product_id',
})

Guarantee.hasMany(WarrantyInformation, {
    foreignKey: 'guarantee_id',
})

Customer.hasMany(WarrantyInformation, {
    foreignKey: 'customer_id',
})

WarrantyInformation.belongsTo(Product, {
    foreignKey: 'product_id',
})

WarrantyInformation.belongsTo(Guarantee, {
    foreignKey: 'guarantee_id',

})

WarrantyInformation.belongsTo(Customer, {
    foreignKey: 'customer_id',
})


module.exports = WarrantyInformation;