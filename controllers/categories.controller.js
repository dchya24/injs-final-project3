const { Category, Product } = require("../models");

exports.postCategory = async (req, res, next) => {
    try {
        const userId = req.userId;
        const {
            type,
            sold_product_amount
        } = req.body;
        const categories = await Category.create({
            type: type,
            sold_product_amount: sold_product_amount,
            UserId: userId
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
        const userId = req.userId;
        const categories = await Category.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'type', 'sold_product_amount'],
                    include: [{
                        model: Product,
                        required: true,
                        as: 'Products',
                        attributes: ['id', 'title', 'price', 'stock', 'CategoryId']
                    }]
                }
            ],
            where: { UserId: userId },
            subQuery: false
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
        const userId = req.userId;
        const {
            type
        } = req.body;

        const categories = await Category.findOne({
            where: {
                UserId: userId,
            }
        });

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
        const userId = req.userId;

        const categories = await Category.destroy({
            where: {
                UserId: userId
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
