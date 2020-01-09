const Joi = require("joi");

exports.validate = function(schema, body, res) {
  const { error, value } = Joi.validate(body, schema);
  if (error) {
    res.status(400).send(error.details[0].message);
    return false;
  }
  return true;
};
