const { Category, Product } = require("../models");
const helper = require("../helpers/bcrypt");

exports.postProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const {
            title,
            price,
            stock,
            CategoryId
        } = req.body;
        const products = await Product.create({
            title: title,
            price: price,
            stock: stock,
            CategoryId: CategoryId,
            UserId: userId
        })

        return res.status(201)
            .json({
                products: {
                    id: products.id,
                    title: products.title,
                    price: helper.convertToIDR(products.price),
                    categoryid: products.CategoryId
                }
            })
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const products = await Product.findAll({
            include: [
                {
                    model: Product,
                    as: 'products',
                    attributes: ['id', 'title', 'caption', 'poster_image_url']
                },
                {
                    model: Category,
                    attributes: ['id', 'username', 'profile_image_url']
                }
            ],
            where: { UserId: userId },
            subQuery: false
        });

        return res.status(200)
            .json({
                products: products
            });
    }
    catch (e) {
        next(e);
    }
}

exports.putProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const CategoryId = req.params.CategoryId
        const {
            price,
            stock,
            title
        } = req.body;

        const product = await Product.findOne({
            where: {
                UserId: userId,
                id: CategoryId
            }
        });

        if (!product) {
            return res.status(404)
                .json({
                    message: "Product not found!"
                });
        }

        product.title = title;
        product.price = price;
        product.stock = stock;

        await product.save();

        return res.status(200)
            .json({
                product: product
            });
    }
    catch (e) {
        next(e);
    }
}

exports.patchProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const {
            CategoryId
        } = req.body;

        const products = await Product.findOne({
            where: {
                UserId: userId
            }
        });

        if (!products) {
            return res.status(404)
                .json({
                    message: "Product not found!"
                });
        }

        products.CategoryId = CategoryId;

        await products.save();

        return res.status(200)
            .json({
                products: products
            });
    }
    catch (e) {
        next(e);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const CategoryId = req.params.CategoryId;

        const products = await Product.destroy({
            where: {
                UserId: userId,
                id: CategoryId
            }
        });

        if (!products) {
            return res.status(404)
                .json({
                    message: "Product not found!"
                });
        }

        return res.status(200)
            .json({
                message: "Your product has been successfully deleted"
            });
    }
    catch (e) {
        next(e);
    }
}