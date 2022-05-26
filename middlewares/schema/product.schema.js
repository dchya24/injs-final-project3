const joi = require("joi");

exports.PRODUCT_POST_BODY = joi.object({
    title: joi.string().trim().required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    CategoryId: joi.number().required()
});

exports.PRODUCT_UPDATE_BODY = joi.object({
    title: joi.string().trim().required(),
    price: joi.number().required(),
    stock: joi.number().required()
});

exports.PRODUCT_ID_PARAMS = joi.object({
    productId: joi.number().required()
});

exports.PRODUCT_PATCH_BODY = joi.object({
    CategoryId: joi.number().required()
});