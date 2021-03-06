const db = require("../Config/DatabaseConfig");
const Joi = require("joi");
const joiValidation = require("./JoiValidation");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.mark = function(req, res) {
  var id = req.params.id;
  db.attendance
    .update(
      { isPresent: true },
      {
        where: {
          uid: id,
          date: getDateWithoutTime(new Date())
        }
      }
    )
    .then(attendance => {
      res.send({ message: "success", data: attendance });
    })
    .catch(err => {
      res.send({ message: "error", data: null });
    });
};

exports.resetAtMidNight = function() {
  db.user
    .findAll({ attributes: ["id"], where: { isRegistered: true } })
    .then(idNumbers => {
      db.holiday
        .findAll({ where: { date: getDateWithoutTime(new Date()) } })
        .then(holidays => {
          var attendanceData = [];
          idNumbers.forEach(number => {
            attendanceData.push({
              date: getDateWithoutTime(new Date()),
              uid: number.id,
              isPresent: false,
              isHoliday: holidays.length > 0
            });
          });
          db.attendance.bulkCreate(attendanceData);
        });
    });
};

exports.getAttendanceByDate = function(req, res, date) {
  db.user
    .findAll({
      where: {
        isRegistered: true
      },
      include: {
        model: db.attendance,
        where: {
          date: getDateWithoutTime(Date.parse(date))
        }
      }
    })
    .then(result => {
      res.send({ message: "success", data: result });
    })
    .catch(err => {
      res.send({ message: "error", data: null });
    });
};

exports.getAllAttendance = function(req, res) {
  db.user
    .findAll({
      where: {
        isRegistered: true
      },
      include: [db.attendance]
    })
    .then(result => {
      res.send({ message: "success", data: result });
    })
    .catch(err => {
      res.send({ message: "error", data: null });
    });
};

exports.makeHoliday = function(req, res, date) {
  const empId = req.decoded.empId;
  db.user.findOne({ where: { empId: empId } }).then(user => {
    if (!user.isAdmin) {
      res.send({ message: "no access", data: null });
      return;
    }
    db.holiday
      .create({
        date: getDateWithoutTime(Date.parse(date))
      })
      .then(hol => {
        res.send({ message: "success", data: null });
      })
      .catch(err => {
        console.log(err);
        res.send({ message: "error", data: null });
      });
  });
};

exports.getHolidays = function(req, res) {
  db.holiday
    .findAll({
      where: {
        date: {
          [Op.gte]: getDateWithoutTime(new Date())
        }
      },
      order: [
        ['date', 'ASC'],
    ],
    })
    .then(holidays => {
      res.send({message:'success',data:holidays});
    }).catch(err => {
      console.log(err);
      res.send({ message: "error", data: null });
    });
};

function getDateWithoutTime(date) {
  return require("moment")(date).format("YYYY-MM-DD");
}
