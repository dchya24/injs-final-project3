const mock = require("node-mocks-http");
const CategoriesController = require("../../controllers/categories.controller");
const { Category } = require("../../models");
const CATEGORY_DATA = require("../data/category.data");
const helper = require("../../helpers/helpers")

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
    req = mock.createRequest();
    res = mock.createResponse();
    next = jest.fn();
});

describe("CategoryController.postCategory", () => {
    it("should return status code 201", async () => {
        req.body = CATEGORY_DATA.postCategory;
        req.userId = 1;
        Category.findOne.mockResolvedValue(null);
        Category.create.mockResolvedValue(CATEGORY_DATA.postCategory);
        await CategoriesController.postCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(201);
        expect(res._getJSON()).toEqual(CATEGORY_DATA.postCategory);
    });

    it("should return status code 503", async () => {
        req.body = CATEGORY_DATA.postCategory;
        req.userId = 1;
        Category.findOne.mockResolvedValue(CATEGORY_DATA.postCategory);
        await CategoriesController.postCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Category already exists"
        });

    });

});

describe("CategoryController.getCategory", () => {
    it("should return status code 200", async () => {
        req.params.id = 1;
        Category.findOne.mockResolvedValue(CATEGORY_DATA.getCategory);
        await CategoriesController.getCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(CATEGORY_DATA.getCategory);
    });

    it("should return status code 503", async () => {
        req.params.id = 1;
        Category.findOne.mockResolvedValue(null);
        await CategoriesController.getCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Category not found"
        });
    });
});

describe("CategoryController.patchCategory", () => {
    it("should return status code 200", async () => {
        req.params.id = 1;
        req.body = CATEGORY_DATA.patchCategory;
        Category.findOne.mockResolvedValue(CATEGORY_DATA.getCategory);
        Category.update.mockResolvedValue(CATEGORY_DATA.getCategory);
        await CategoriesController.patchCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(CATEGORY_DATA.getCategory);
    });

    it("should return status code 503", async () => {
        req.params.id = 1;
        req.body = CATEGORY_DATA.patchCategory;
        Category.findOne.mockResolvedValue(null);
        await CategoriesController.patchCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(503);

        expect(res._getJSON()).toEqual({
            message: "Category not found"
        });
    });
});

describe("CategoryController.deleteCategory", () => {
    it("should return status code 200", async () => {
        req.params.id = 1;
        Category.findOne.mockResolvedValue(CATEGORY_DATA.getCategory);
        Category.destroy.mockResolvedValue(CATEGORY_DATA.getCategory);
        await CategoriesController.deleteCategory(req, res, next);

        expect(res._isJSON()).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res._getJSON()).toEqual(CATEGORY_DATA.getCategory);
    });
});