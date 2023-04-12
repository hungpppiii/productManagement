module.exports = (sequelize, DataTypes) =>
    sequelize.define('WarrantyInformation', {
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
            field: 'warranty_end_time',
        },
    }, {
        tableName: 'warranty_information',
    });