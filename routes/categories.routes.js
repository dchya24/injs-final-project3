const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories.controller");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const CATEGORY_SCHEMA = require("../middlewares/schema/category.schema");

router.get(
    "/",
    auth.verifyToken,
    auth.isAdmin,
    controller.getCategory
);

router.post(
    "/",
    validator.validateRequest(CATEGORY_SCHEMA.CATEGORY_POST_BODY),
    auth.verifyToken,
    auth.isAdmin,
    controller.postCategory
);

router.delete(
    "/:categoryId",
    validator.validateParams(CATEGORY_SCHEMA.CATEGORY_ID_PARAMS),
    auth.verifyToken,
    auth.isAdmin,
    controller.deleteCategory
);

router.patch("/:categoryId",
    validator.validateRequest(CATEGORY_SCHEMA.CATEGORY_UPDATE_BODY),
    auth.verifyToken,
    auth.isAdmin,
    controller.patchCategory
);

module.exports = router;