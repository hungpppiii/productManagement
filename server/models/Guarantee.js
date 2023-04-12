module.exports = (sequelize, DataTypes) =>
    sequelize.define('Guarantee', {
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