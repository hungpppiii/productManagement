module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'WarrantyInformation',
        {
            warrantyStartTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'warranty_start_time',
            },
            warrantyEndTime: {
                type: DataTypes.DATE,
                field: 'warranty_end_time',
            },
        },
        {
            tableName: 'warranty_information',
        },
    );
