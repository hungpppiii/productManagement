const {
    DataTypes
} = require('sequelize');
const Account = require('./Account.js')
const sequelize = require('./../config/db');

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'store_id',
    },
    // accountId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     field: 'account_id',
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'store_name'
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'store',
});

Store.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};


module.exports = Store;