const joi = require("joi");

exports.CATEGORY_POST_BODY = joi.object({
    type: joi.string().trim().required()
});

exports.CATEGORY_UPDATE_BODY = joi.object({
    type: joi.string().trim().required()
});

exports.CATEGORY_ID_PARAMS = joi.object({
    productId: joi.number().required()
});
