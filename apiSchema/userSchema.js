const Joi = require('@hapi/joi');

module.exports.signup = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string(),
  termsAndConditions: Joi.boolean()
});

module.exports.login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});