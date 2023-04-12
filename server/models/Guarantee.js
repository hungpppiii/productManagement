const {
    DataTypes
} = require('sequelize');
const Account = require('./Account.js');
const Store = require('./Store.js');
const sequelize = require('./../config/db');

const Guarantee = sequelize.define('Guarantee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'guarantee_id',
    },
    // accountId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     field: 'account_id',
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'guarantee_name'
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'guarantee',
});

Guarantee.belongsToMany(Store, {
    through: 'store_guarantee',
})

Store.belongsToMany(Guarantee, {
    through: 'store_guarantee',
})

Guarantee.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};


module.exports = Guarantee;