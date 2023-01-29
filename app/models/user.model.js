const { DataTypes } = require("sequelize");
const UserModel = (sequelize) => {
  return sequelize.define(
    "User",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          checkAge(value) {
            if (value < 0 || value >= 50) {
              throw new Error("Age must be between 0 and 50");
            } else {
              return true;
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );
};
module.exports = UserModel;
