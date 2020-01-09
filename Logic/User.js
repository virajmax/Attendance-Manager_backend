const db = require("../Config/DatabaseConfig");
const Joi = require("joi");
const joiValidation = require("./JoiValidation");

exports.registerUser = function(req, res) {
  const schema = {
    empId: Joi.string().required(),
    nic: Joi.string().required()
  };
  if (!joiValidation.validate(schema, req.body, res)) {
    return;
  }

  const empId = req.decoded.empId;
  db.user.findOne({ where: { empId: empId } }).then(user => {
    if (!user.isAdmin) {
      res.send({ message: "no access", data: null });
      return;
    }

    db.user
      .create({
        empId: req.body.empId,
        nic: req.body.nic
      })
      .then(user => {
        res.send({ message: "success", data: user });
      })
      .catch(err => {
        res.send({ message: "error", data: null });
      });
  });
};
