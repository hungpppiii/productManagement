module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Account",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "account_id",
      },
      username: {
        type: DataTypes.STRING,
        unique: "username",
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "account",
    }
  );
