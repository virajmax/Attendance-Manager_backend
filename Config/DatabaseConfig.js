const Sequelize = require("sequelize");

var databaseTesting = {
  host: "localhost",
  user: "root",
  password: "",
  database: "zcp6b4onvb"
};

var databaseProduction = {
  host: "remotemysql.com",
  user: "zcp6b4onvb",
  password: "jHMGRBT1fw",
  database: "zcp6b4onvb"
};

const sequelize = new Sequelize(
  databaseTesting.database,
  databaseTesting.user,
  databaseTesting.password,
  {
    host: databaseTesting.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ force: false }).then(() => {});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../Model/User")(sequelize, Sequelize);
db.attendance = require("../Model/Attendance")(sequelize, Sequelize);

db.user.hasMany(db.attendance, {
  foreignKey: {
    allowNull: false,
    name: "uid"
  }
});

db.attendance.belongsTo(db.user, {
  foreignKey: {
    allowNull: false,
    name: "uid"
  }
});

module.exports = db;
