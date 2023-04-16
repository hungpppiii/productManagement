module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'DistributeInformation',
        {
            distributionDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'distribution_date',
            },
        },
        {
            tableName: 'distribute_information',
        },
    );
