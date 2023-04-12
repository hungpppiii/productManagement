module.exports = (sequelize, DataTypes) =>
    sequelize.define('Order', {
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