const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories.controller");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const CATEGORY_SCHEMA = require("../middlewares/schema/product.schema");

router.get("/",
    validator.validateRequest(auth, controller.getCategory)
);

router.post(
    "/",
    validator.validateRequest(CATEGORY_SCHEMA.CATEGORY_POST_BODY),
    controller.postCategory
);

router.delete("/:userId",
    validator.validateParams(CATEGORY_SCHEMA.CATEGORY_ID_PARAMS),
    auth.verifyToken,
    controller.deleteCategory
);

router.patch("/",
    validator.validateRequest(CATEGORY_SCHEMA.CATEGORY_UPDATE_BODY),
    auth.verifyToken,
    controller.patchCategory
);

module.exports = router;