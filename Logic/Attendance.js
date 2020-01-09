const db = require("../Config/DatabaseConfig");
const Joi = require("joi");
const joiValidation = require("./JoiValidation");

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
      var attendanceData = [];
      idNumbers.forEach(number => {
        attendanceData.push({
          date: getDateWithoutTime(new Date()),
          uid: number.id,
          isPresent: false
        });
      });
      db.attendance.bulkCreate(attendanceData);
    });
};

exports.getAttendanceByDate = function(req, res, date) {
  db.attendance
    .findAll({
      where: { date: getDateWithoutTime(date) },
      include: [db.user]
    })
    .then(result => {
      res.send(result);
    });
};

exports.getAttendanceByDateRange = function(req, res, from, to) {
  db.attendance
    .findAll({
      where: {
        date: {
          $between: [Date.parse(from), Date.parse(to)]
        }
      },
      include: [db.user]
    })
    .then(result => {
      res.send(result);
    });
};

function getDateWithoutTime(date) {
  return require("moment")(date).format("YYYY-MM-DD");
}
