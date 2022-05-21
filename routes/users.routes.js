const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const USER_SCHEMA = require("../middlewares/schema/user.schema");

router.post("/register",
  validator.validateRequest(USER_SCHEMA.USER_REGISTER_BODY),
  controller.register
);

router.post(
  "/login", 
  validator.validateRequest(USER_SCHEMA.USER_LOGIN_BODY),
  controller.login
);

router.put("/:userId",
  validator.validateParams(USER_SCHEMA.USER_ID_PARAMS),
  validator.validateRequest(USER_SCHEMA.USER_UPDATE_BODY),
  auth.verifyToken,
  controller.updateUser
);

router.delete("/:userId",
  validator.validateParams(USER_SCHEMA.USER_ID_PARAMS),
  auth.verifyToken,
  controller.delete
);

router.patch("/",
  validator.validateRequest(USER_SCHEMA.USER_TOPUP_BODY),
  auth.verifyToken,
  controller.topup
);

module.exports = router;