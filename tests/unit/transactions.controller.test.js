const mock = require("node-mocks-http");
const helper = require("../../helpers/helper")
const TransactionController = require("../../controllers/transactionHistories.controller");
const {
  TransactionHistory, 
  Product, 
  User, 
  Category 
} = require("../../models");
const USER_DATA = require("../data/users.data");
const TRANSACTION_DATA = require("../data/transactions.data");
const PRODUCT_DATA = require("../data/products.data");

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
  req = mock.createRequest();
  res = mock.createResponse();
  next = jest.fn();
})

describe('TransactionController.getTransactions', () => {
  it('Should return 200', async() => {
    req.user = USER_DATA.USER_PAYLOAD;
    TransactionHistory.findAll.mockResolvedValue(TRANSACTION_DATA.TRANSACTION_HISTORIES);

    await TransactionController.getTransactions(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("transactionHistories");
  });

  it('Should handle errors', async() => {
    req.user = USER_DATA.USER_PAYLOAD;
    TransactionHistory.findAll.mockRejectedValue({ message: "Error handle get transactions for admin"});

    await TransactionController.getTransactions(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('TransactionController.getTransactionsByAdmin', () => {
  it('should return 200 and return transaction data', async() => {
    TransactionHistory.findAll.mockResolvedValue(TRANSACTION_DATA.TRANSACTION_HISTORIES);

    await TransactionController.getTransactionsByAdmin(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("transactionHistories");
  });

  it('Should handle errors', async() => {
    req.user = USER_DATA.USER_PAYLOAD;
    TransactionHistory.findAll.mockRejectedValue({ message: "Error handle get transactions"});

    await TransactionController.getTransactionsByAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('TransactionController.getTransactionById', () => {
  it('Should return 200', async() => {
    req.params.transactionId = 2;
    TransactionHistory.findOne.mockResolvedValue(TRANSACTION_DATA.TRANSACTION_HISTORY);

    await TransactionController.getTransactionById(req, res, next);
    expect(res.statusCode).toEqual(200);
  });

  it('Should handle errors', async() => {
    req.params.transactionId = 2;
    TransactionHistory.findOne.mockRejectedValue({ message: "Error handle get transactions by Id"});

    await TransactionController.getTransactionById(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

// describe('TransactionController.createTransaction', () => {
//   beforeEach(() => {
//     req.body = {
//       quantity: 6,
//       productId: 2
//     }
//     req.user = USER_DATA.USER_PAYLOAD;
//   });

//   it('should return 400 when product not found ', async() => {
//     req.body.quantity = 5;
//     Product.findByPk.mockResolvedValue(null);

//     await TransactionController.createTransaction(req, res, next);
//     expect(res.statusCode).toEqual(400);
//     expect(res._getJSONData()).toHaveProperty("message", "Product not found!");
//   });

//   it('should return 400 when stock lower than quantity', async() => {
//     req.body.quantity = 5;
//     User.findByPk.mockResolvedValue(USER_DATA.USER_DATA_WITH_BALANCE);
//     Product.findByPk.mockResolvedValue(PRODUCT_DATA.PRODUCT_DATA);

//     await TransactionController.createTransaction(req, res, next);
//     expect(res.statusCode).toEqual(400);
//     expect(res._getJSONData()).toHaveProperty("message", "Jumlah pembelian melebihi stock produk!");
//   });

  // it('should return 400 when user balance not enough', async() => {
  //   req.body.quantity = 2;
  //   User.findByPk.mockResolvedValue(USER_DATA.USER_DATA_WITH_BALANCE);
  //   Product.findByPk.mockResolvedValue(PRODUCT_DATA.PRODUCT_DATA);

  //   await TransactionController.createTransaction(req, res, next);
  //   expect(res.statusCode).toEqual(400);
  //   expect(res._getJSONData()).toHaveProperty("message", "Saldo anda tidak mencukupi untuk pembayaran!");
  // });

//   it('Should handle errors', async() => {
//     req.params.transactionId = 2;
//     Product.findByPk.mockRejectedValue({ message: "Error handle create transactions"});

//     await TransactionController.getTransactionById(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });
// });