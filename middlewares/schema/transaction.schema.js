const joi = require("joi");

exports.TRANSACTION_BODY = joi.object({
  productId: joi.number().required(),
  quantity: joi.number().required()
});