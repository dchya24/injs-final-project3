const mock = require("node-mocks-http");
const ProductController = require("../../controllers/product.controller");
const { Product } = require("../../models");
const PRODUCT_DATA = require("../data/product.data");
const helper = require("../../helpers/helpers");

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
    req = mock.createRequest();
    res = mock.createResponse();
    next = jest.fn();
});

describe("ProductController.postProduct", () => {
    it("should return a product", async () => {
        req.body = PRODUCT_DATA.postProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(null);
        Product.create.mockResolvedValue(PRODUCT_DATA.postProduct);
        await ProductController.postProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(201);
        expect(res._getJSON()).toEqual(PRODUCT_DATA.postProduct);
    });

    it("should return status code 503", async () => {
        req.body = PRODUCT_DATA.postProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(PRODUCT_DATA.postProduct);
        await ProductController.postProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Product already exists"
        });
    });
});

describe("ProductController.getProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        Product.findOne.mockResolvedValue(PRODUCT_DATA.getProduct);
        await ProductController.getProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(PRODUCT_DATA.getProduct);
    });

    it('should return status code 503', async () => {
        req.params.id = 1;
        Product.findOne.mockResolvedValue(null);
        await ProductController.getProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Product does not exist"
        });
    });
});

describe("ProductController.putProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.putProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(PRODUCT_DATA.putProduct);
        Product.update.mockResolvedValue(PRODUCT_DATA.putProduct);
        await ProductController.putProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(PRODUCT_DATA.putProduct);
    });

    it('should return status code 503', async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.putProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(null);
        await ProductController.putProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Product does not exist"
        });
    });
});

describe("ProductController.patchProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.patchProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(PRODUCT_DATA.patchProduct);
        Product.update.mockResolvedValue(PRODUCT_DATA.patchProduct);
        await ProductController.patchProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(PRODUCT_DATA.patchProduct);
    });

    it('should return status code 503', async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.patchProduct;
        req.userId = 1;
        Product.findOne.mockResolvedValue(null);
        await ProductController.patchProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
        });
    });
});

describe("ProductController.deleteProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        req.userId = 1;
        Product.findOne.mockResolvedValue(PRODUCT_DATA.deleteProduct);
        Product.destroy.mockResolvedValue(PRODUCT_DATA.deleteProduct);
        await ProductController.deleteProduct(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(PRODUCT_DATA.deleteProduct);
    });
});