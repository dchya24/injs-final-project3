const TransactionController = require("../../controllers/transactionHistories.controller");
const http = require("node-mocks-http");
const USER_DATA = require("../data/users.data");
const TRANSACTION_DATA = require("../data/transactions.data");
const PRODUCT_DATA = require("../data/products.data");
const {
  TransactionHistory, 
  Product, 
  User, 
  Category 
} = require("../../models");

let req, res, next;

beforeEach(() => {
  req = http.createRequest();
  res = http.createResponse();
  next = jest.fn();
})

describe('TransactionController.createTransaction', () => {
  beforeEach(() => {
    req.body = {
      quantity: 6,
      productId: 2
    }
    req.user = USER_DATA.POOR_USER_PAYLOAD;
  });

    it('should return 400 when product not found ', async() => {
    req.body.productId = 8;

    await TransactionController.createTransaction(req, res, next);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toHaveProperty("message", "Product not found!");
  });

  it('should return 400 when stock lower than quantity', async() => {
    req.body.quantity = 5;
    req.body.productId = 5;

    await TransactionController.createTransaction(req, res, next);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toHaveProperty("message", "Jumlah pembelian melebihi stock produk!");
  });

  it('should return 400 when user balance not enough', async() => {
    req.body.quantity = 2;
    req.user = USER_DATA.POOR_USER_PAYLOAD;

    await TransactionController.createTransaction(req, res, next);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toHaveProperty("message", "Saldo anda tidak mencukupi untuk pembayaran!");
  });

  it('should return 201 when user balance not enough', async() => {
    req.body.quantity = 2;
    req.body.productId = 3;
    req.user = USER_DATA.USER_PAYLOAD;

    await TransactionController.createTransaction(req, res, next);
    expect(res.statusCode).toEqual(201);
    expect(res._getJSONData()).toHaveProperty("message", "You have successfully purchase the product");
  });

  it('should handle errors', async() => {
    req.body.quantity = 2;
    req.body.productId = 5;
    req.user = USER_DATA.USER_PAYLOAD;

    await TransactionController.createTransaction(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});