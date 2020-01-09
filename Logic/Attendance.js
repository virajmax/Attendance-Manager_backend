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
  db.user
    .findAll({
      where: {
        isRegistered: true
      },
      include: {
        model: db.attendance,
        where: {
          date: getDateWithoutTime(date)
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
  db.attendance
    .update(
      {
        isHoliday: true
      },
      {
        where: {
          date: getDateWithoutTime(Date.parse(date))
        }
      }
    )
    .then(updated => {
      res.send({ message: "success", data: updated });
    })
    .catch(err => {
      res.send({ message: "error", data: null });
    });
};

function getDateWithoutTime(date) {
  return require("moment")(date).format("YYYY-MM-DD");
}