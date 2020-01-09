module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      fullName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      nic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      empId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isRegistered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
  return User;
};
