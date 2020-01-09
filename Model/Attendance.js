module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define(
      "Attendance",
      {
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        isPresent: {
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
    return Attendance;
  };
  