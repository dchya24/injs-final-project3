const controller = require("../../controllers/products.controller");
const { Product, Category } = require("../../models");
const http = require("node-mocks-http");
const PRODUCT_DATA = require("../data/products.data");

let req, res, next;

beforeEach(() => {
  req = http.createRequest();
  res = http.createResponse();
  next = jest.fn();
});

describe('Patch Product', () => {
  it('should return 404 when category not found', async () => {
    req.params.productId = 1;
    req.body.CategoryId = 9;

    await controller.patchProduct(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._getJSONData()).toHaveProperty("message", "Category with id 9 not found!")
  });

  it('should return 404 when product not found', async () => {
    req.params.productId = 9;
    req.body.CategoryId = 2;

    await controller.patchProduct(req, res, next);
    console.log(res._getData())
    expect(res.statusCode).toEqual(404);
    expect(res._getJSONData()).toHaveProperty("message", "Product not found!")
  });

  it('should return 200 when success update data', async () => {
    req.params.productId = 3;
    req.body.CategoryId = 2;

    await controller.patchProduct(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("products")
  });

  beforeEach(() => {
    jest.mock("../../models");
  });
});