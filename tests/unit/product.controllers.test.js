const mock = require("node-mocks-http");
const ProductController = require("../../controllers/products.controller");
const { Product, Category } = require("../../models");
const PRODUCT_DATA = require("../data/products.data");
const helper = require("../../helpers/helper");

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
    req = mock.createRequest();
    res = mock.createResponse();
    next = jest.fn();
});

describe("ProductController.postProduct", () => {
    it("should return a product", async () => {
        req.body = PRODUCT_DATA.PRODUCT_DATA;
        req.userId = 1;
        Category.findByPk.mockResolvedValue({ id: 2, type: "soft drink"})
        Product.create.mockResolvedValue(PRODUCT_DATA.PRODUCT_DATA);
        await ProductController.postProduct(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toHaveProperty("products");
    });

    it("should return status code 404 when category not found", async () => {
        req.body = PRODUCT_DATA.PRODUCT_DATA;
        req.userId = 1;
        Category.findByPk.mockResolvedValue(null)
        Product.findOne.mockResolvedValue(PRODUCT_DATA.PRODUCT_DATA);
        await ProductController.postProduct(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toHaveProperty("message");
    });

    it("should handle erros", async () => {
        req.body = PRODUCT_DATA.PRODUCT_DATA;
        req.userId = 1;
        Category.findByPk.mockRejectedValue({mesage: "error"})
        Product.findOne.mockRejectedValue({mesage: "error"});
        await ProductController.postProduct(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("ProductController.getProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        Product.findAll.mockResolvedValue(PRODUCT_DATA.PRODUCTS);
        await ProductController.getProduct(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty("products", PRODUCT_DATA.PRODUCTS);
    });

    it('should handle errors', async () => {
        req.params.id = 1;
        Product.findAll.mockRejectedValue({message: "error"});
        await ProductController.getProduct(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("ProductController.putProduct", () => {
    it("should return a product", async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.PUT_PRODUCT;
        req.userId = 1;
        Product.findByPk.mockResolvedValue({
            ...PRODUCT_DATA.PUT_PRODUCT,
            save: jest.fn()
        });

        await ProductController.putProduct(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty("product");
    });

    it('should return status code 404 when product not found', async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.PUT_PRODUCT;
        req.userId = 1;
        Product.findByPk.mockResolvedValue(null);
        await ProductController.putProduct(req, res, next);

        expect(res.statusCode).toBe(404);

        expect(res._getJSONData()).toHaveProperty("message", "Product not found!");
    });
    it('should handle errors', async () => {
        req.params.id = 1;
        req.body = PRODUCT_DATA.PUT_PRODUCT;
        req.userId = 1;
        Product.findByPk.mockRejectedValue({ message: "error"});
        await ProductController.putProduct(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("ProductController.deleteProduct", () => {
    it("should return 200 when success delete product", async () => {
        req.params.id = 1;
        Product.destroy.mockResolvedValue(PRODUCT_DATA.PRODUCT_DATA);
        await ProductController.deleteProduct(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty("message", "Your product has been successfully deleted");
    });
    
    it('should return status code 404 when product not found', async () => {
        req.params.id = 1;
        Product.destroy.mockResolvedValue(null);
        await ProductController.deleteProduct(req, res, next);

        expect(res._getJSONData()).toHaveProperty("message", "Product not found!");
    });

    it("should handle errors", async () => {
        req.params.id = 1;
        Product.destroy.mockRejectedValue({ message: "error"});
        await ProductController.deleteProduct(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("handdle errors patchProduct", () => {
    it('should handle errors', async () => {
        Category.findByPk.mockRejectedValue({ message: "error "});
        await ProductController.patchProduct(req, res, next);
        console.log(res._getData());
        expect(next).toHaveBeenCalled();
    });
});