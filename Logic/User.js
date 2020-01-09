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
};
