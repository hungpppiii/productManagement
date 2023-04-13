module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'ProductLine',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'product_line_id',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            warrantyPeriod: {
                type: DataTypes.INTEGER,
                // allowNull: false,
                field: 'warranty_period',
            },
            description: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'product_line',
        },
    );
