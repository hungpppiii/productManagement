module.exports = (sequelize, DataTypes) =>
    sequelize.define('Factory', {
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