module.exports = (sequelize, Sequelize) => {
    const Holiday = sequelize.define(
      "Holiday",
      {
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          unique: true
        }
      },
      {
        freezeTableName: true
      }
    );
    return Holiday;
  };
  