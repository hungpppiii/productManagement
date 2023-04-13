module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Store',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'store_id',
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                field: 'account_id',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'store_name',
            },
            address: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'store',
        },
    );
