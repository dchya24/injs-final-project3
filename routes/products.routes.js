const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const PRODUCT_SCHEMA = require("../middlewares/schema/product.schema");

router.get("/",
    auth.verifyToken,
    controller.getProduct
);

router.post(
    "/",
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_POST_BODY),
    auth.verifyToken,
    auth.isAdmin,
    controller.postProduct
);

router.put("/:productId",
    validator.validateParams(PRODUCT_SCHEMA.PRODUCT_ID_PARAMS),
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_UPDATE_BODY),
    auth.verifyToken,
    auth.isAdmin,
    controller.putProduct
);

router.delete("/:productId",
    validator.validateParams(PRODUCT_SCHEMA.PRODUCT_ID_PARAMS),
    auth.verifyToken,
    auth.isAdmin,
    controller.deleteProduct
);

router.patch("/:productId",
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_PATCH_BODY),
    auth.verifyToken,
    auth.isAdmin,
    controller.patchProduct
);

module.exports = router;