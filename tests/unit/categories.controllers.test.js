const mock = require("node-mocks-http");
const CategoriesController = require("../../controllers/categories.controller");
const { Category } = require("../../models");
const CATEGORY_DATA = require("../data/category.data");
const helper = require("../../helpers/helper")

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
    req = mock.createRequest();
    res = mock.createResponse();
    next = jest.fn();
});

describe("CategoryController.postCategory", () => {
    it("should return status code 201", async () => {
        req.body = CATEGORY_DATA.category;
        req.userId = 1;
        Category.findOne.mockResolvedValue(null);
        Category.create.mockResolvedValue(CATEGORY_DATA.category);
        await CategoriesController.postCategory(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toHaveProperty("categories", CATEGORY_DATA.category);
    });

    it("should handle errors", async () => {
        req.body = CATEGORY_DATA.category;
        req.userId = 1;
        Category.create.mockRejectedValue({ mesesage: "error" });
        await CategoriesController.postCategory(req, res, next);

        expect(next).toHaveBeenCalled();
    });

});

// describe("CategoryController.getCategory", () => {
    it("should return status code 200", async () => {
        req.params.id = 1;
        Category.findAll.mockResolvedValue(CATEGORY_DATA.getCategory);
        await CategoriesController.getCategory(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty('categories', CATEGORY_DATA.getCategory);
    });

    it("should handle error", async () => {
        req.params.id = 1;
        Category.findAll.mockRejectedValue({ message: "error"});
        await CategoriesController.getCategory(req, res, next);

        expect(next).toHaveBeenCalled();
    });
// });

describe("CategoryController.patchCategory", () => {
    it("should return status code 200", async () => {
        req.params.categoryId = 1;
        req.body.type = "drink";

        Category.findByPk.mockResolvedValue({
            ...CATEGORY_DATA.category,
            save: jest.fn()
        });
        await CategoriesController.patchCategory(req, res, next);

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toHaveProperty("categories", CATEGORY_DATA.update_category);
    });

    it("should return status code 404 when data not found", async () => {
        req.params.id = 1;
        req.body = CATEGORY_DATA.category;
        Category.findByPk.mockResolvedValue(null);
        await CategoriesController.patchCategory(req, res, next);

        expect(res.statusCode).toBe(404);

        expect(res._getJSONData()).toHaveProperty("message", "Category not found!");
    });

    it("should handle error", async () => {
        req.params.id = 1;
        Category.findByPk.mockRejectedValue({ message: "error"});
        await CategoriesController.patchCategory(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("CategoryController.deleteCategory", () => {
    it("should return status code 200", async () => {
        req.params.id = 1;
        Category.destroy.mockResolvedValue(true);
        await CategoriesController.deleteCategory(req, res, next);

        expect(res.statusCode).toEqual(200);
    });

    it("should return status code 404", async () => {
        req.params.id = 1;
        Category.destroy.mockResolvedValue(null);
        await CategoriesController.deleteCategory(req, res, next);

        expect(res.statusCode).toEqual(404);
    });

    it("should handle errors", async () => {
        req.params.id = 1;
        Category.destroy.mockRejectedValue({mesage:"error"});
        await CategoriesController.deleteCategory(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});