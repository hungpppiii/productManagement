module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'product_id',
            },
            productLineId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'product_line_id',
            },
            productionDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'production_date',
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'product',
        },
    );
