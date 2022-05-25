const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const PRODUCT_SCHEMA = require("../middlewares/schema/product.schema");

router.get("/",
    validator.validateRequest(auth, controller.getProduct)
);

router.post(
    "/",
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_POST_BODY),
    controller.postProduct
);

router.put("/:userId",
    validator.validateParams(PRODUCT_SCHEMA.PRODUCT_ID_PARAMS),
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_UPDATE_BODY),
    auth.verifyToken,
    controller.putProduct
);

router.delete("/:userId",
    validator.validateParams(PRODUCT_SCHEMA.PRODUCT_ID_PARAMS),
    auth.verifyToken,
    controller.deleteProduct
);

router.patch("/",
    validator.validateRequest(PRODUCT_SCHEMA.PRODUCT_PATCH_BODY),
    auth.verifyToken,
    controller.patchProduct
);

module.exports = router;