const joi = require("joi");

exports.USER_REGISTER_BODY = joi.object({
  full_name: joi.string().trim().required(),
  email: joi.string().trim().email(),
  password: joi.string().trim().min(6),
  gender: joi.string().trim()
});

exports.USER_LOGIN_BODY = joi.object({
  email: joi.string().trim().email(),
  password: joi.string().trim().min(6)
});

exports.USER_UPDATE_BODY = joi.object({
  full_name: joi.string().trim().required(),
  email: joi.string().trim().email()
});

exports.USER_UPDATE_BODY = joi.object({
  full_name: joi.string().trim().required(),
  email: joi.string().trim().email()
});

exports.USER_ID_PARAMS = joi.object({
  userId: joi.number().required()
});

exports.USER_TOPUP_BODY = joi.object({
  balance: joi.number().required()
});