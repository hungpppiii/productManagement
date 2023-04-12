const {
    DataTypes
} = require('sequelize');
const Account = require('./Account.js');
const Store = require('./Store.js');
const sequelize = require('./../config/db');

const Factory = sequelize.define('Factory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'factory_id',
    },
    // accountId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     field: 'account_id',
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'factory_name'
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'factory',
});

Factory.belongsToMany(Store, {
    through: 'store_factory',
})

Store.belongsToMany(Factory, {
    through: 'store_factory',
})

Factory.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};


module.exports = Factory;