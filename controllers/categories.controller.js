const { Category, Product } = require("../models");

exports.postCategory = async (req, res, next) => {
    try {
        const {
            type
        } = req.body;
        
        const categories = await Category.create({
            type: type
        })

        return res.status(201)
            .json({ categories: categories })
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include: ['products']
        });

        return res.status(200)
            .json({
                categories: categories
            });
    }
    catch (e) {
        next(e);
    }
}

exports.patchCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const {
            type
        } = req.body;

        const categories = await Category.findByPk(categoryId);

        if (!categories) {
            return res.status(404)
                .json({
                    message: "Category not found!"
                });
        }

        categories.type = type;

        await categories.save();

        return res.status(200)
            .json({
                categories: categories
            });
    }
    catch (e) {
        next(e);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        const categories = await Category.destroy({
            where: {
                id: categoryId
            }
        });

        if (!categories) {
            return res.status(404)
                .json({
                    message: "Category not found!"
                });
        }

        return res.status(200)
            .json({
                message: "Category has been successfully deleted"
            });
    }
    catch (e) {
        next(e);
    }
}
