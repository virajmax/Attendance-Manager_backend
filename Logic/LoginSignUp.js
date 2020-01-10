const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Config/DatabaseConfig");
const Joi = require("joi");
const joiValidation = require("./JoiValidation");
const conf = require("../Config/config");

exports.signUp = function(req, res) {
  const schema = {
    empId: Joi.string().required(),
    nic: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    fullName: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  if (!joiValidation.validate(schema, req.body, res)) {
    return;
  }

  db.user
    .findOne({
      where: {
        empId: req.body.empId,
        nic: req.body.nic,
        isRegistered: false
      }
    })
    .then(user => {
      if (user == null) {
        res.send({ message: "no record", data: null });
        return;
      }

      bcrypt.hash(req.body.password, 10).then(function(hash) {
        db.user
          .update(
            {
              fullName: req.body.fullName,
              password: hash,
              email: req.body.email,
              isRegistered: true
            },
            { where: { id: user.id } }
          )
          .then(user2 => {
            db.holiday
              .findAll({
                where: { date: getDateWithoutTime(new Date()) }
              })
              .then(holidays => {
                db.attendance
                  .create({
                    date: getDateWithoutTime(new Date()),
                    isPresent: false,
                    uid: user.id,
                    isHoliday: holidays.length > 0
                  })
                  .then(createdAttendance => {
                    res.send({ message: "success", data: user2 });
                  });
              });
          })
          .catch(err => {
            console.log(err);
            res.send({ message: "no record", data: null });
          });
      });
    })
    .catch(err => {
      res.send({ message: "no record", data: null });
    });
};

exports.login = function(req, res) {
  console.log(req.body);
  const schema = {
    empId: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
  };
  if (!joiValidation.validate(schema, req.body, res)) {
    return;
  }
  db.user
    .findOne({
      where: { empId: req.body.empId },
      include: {
        model: db.attendance,
        where: {
          date: getDateWithoutTime(new Date())
        }
      }
    })
    .then(user => {
      if (user == null) {
        res.json({ message: "no record", data: null });
        return;
      }
      var hash = user.password;
      bcrypt.compare(req.body.password, hash, function(err, res2) {
        if (err) {
          res.send({ message: "error", data: null });
        } else if (res2) {
          let token = jwt.sign({ empId: req.body.empId }, conf.secret);
          user.password = "";
          res.json({ message: "success", data: user, token: token });
        } else {
          res.json({ message: "no record", data: null });
        }
      });
    })
    .catch(err => {
      res.send({ message: "no record", data: null });
    });
};

function getDateWithoutTime(date) {
  return require("moment")(date).format("YYYY-MM-DD");
}
