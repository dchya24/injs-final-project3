const { Category, Product } = require("../models");
const helper = require("../helpers/helper");

exports.postProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const {
            title,
            price,
            stock,
            CategoryId
        } = req.body;

        const category = await Category.findByPk(CategoryId);

        if(!category){
            return res.status(404)
            .json({
                message: `Category with id ${CategoryId} not found!`
            })
        }
        
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
                    stock: products.stock,
                    categoryid: products.CategoryId,
                    createdAt: products.createdAt,
                    updatedAt: products.updatedAt
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
        const products = await Product.findAll();

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
        const productId = req.params.productId
        const {
            price,
            stock,
            title
        } = req.body;

        const product = await Product.findByPk(productId);

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
                product: {
                    id: product.id,
                    title: product.title,
                    price: helper.convertToIDR(product.price),
                    stock: product.stock,
                    categoryid: product.CategoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                }
            });
    }
    catch (e) {
        next(e);
    }
}

exports.patchProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const {
            CategoryId
        } = req.body;

        const category = await Category.findByPk(CategoryId);

        if(!category){
            return res.status(404)
            .json({
                message: `Category with id ${CategoryId} not found!`
            })
        }

        const products = await Product.findByPk(productId);

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
                products: {
                    id: products.id,
                    title: products.title,
                    price: helper.convertToIDR(products.price),
                    stock: products.stock,
                    categoryid: products.CategoryId,
                    createdAt: products.createdAt,
                    updatedAt: products.updatedAt
                }
            });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;

        const products = await Product.destroy({
            where: {
                id: productId
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