const {
    DataTypes
} = require('sequelize');
const Product = require('./Product.js');
const Store = require('./Store.js');
const sequelize = require('./../config/db');

const DistributeInformation = sequelize.define('DistributeInformation', {
    distributionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'distribution_date',
    },
}, {
    tableName: 'distribute_information',
});

Product.hasOne(DistributeInformation, {
    foreignKey: 'product_id',
    allowNull: false,
})

Store.hasMany(DistributeInformation, {
    foreignKey: 'store_id',
    allowNull: false,
})

DistributeInformation.belongsTo(Product, {
    foreignKey: 'product_id'
})

DistributeInformation.belongsTo(Store, {
    foreignKey: 'store_id'
})



module.exports = DistributeInformation;