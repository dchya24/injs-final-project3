const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/:userId", auth.verifyToken, controller.updateUser);
router.delete("/:userId", auth.verifyToken, controller.delete);
router.patch("/", auth.verifyToken, controller.topup);

module.exports = router;