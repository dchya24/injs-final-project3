const express = require("express");
const Router = express.Router();
const controller = require("../controllers/transactionHistories.controller");
const auth = require("../middlewares/auth");
const validator  = require("../middlewares/validator");
const TRANSACTIONS_SCHEMA = require("../middlewares/schema/transaction.schema")

Router.post("/",
  validator.validateRequest(TRANSACTIONS_SCHEMA.TRANSACTION_BODY),
  auth.verifyToken,
  controller.createTransaction
);

Router.get("/user",
  auth.verifyToken,
  controller.getTransactions
);

Router.get(
  "/:transactionId(\\d+)/",
  auth.verifyToken,
  controller.getTransactionById
)

Router.get(
  "/admin",
  auth.verifyToken,
  auth.isAdmin,
  controller.getTransactionsByAdmin
)


module.exports = Router;