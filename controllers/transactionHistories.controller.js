const { 
  TransactionHistory, 
  Product, 
  User, 
  Category 
} = require("../models");
const helper = require("../helpers/helpers");

exports.createTransaction = async(req, res, next) => {
  try{
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    const user = await User.findByPk(userId);

    if(!product){
      return res.status(400)
        .json({
          message: "Product not found!"
        });
    }

    if(product.stock < quantity){
      return res.status(400)
        .json({
          message: "Jumlah pembelian melebihi stock produk!"
        });
    }

    const total_price = product.price * quantity;

    if(total_price > user.balance){
      return res.status(400)
        .json({
          message: "Saldo anda tidak mencukupi untuk pembayaran!"
        });
    }

    const category = await Category.findByPk(product.CategoryId)

    await product.update({ stock: product.stock - quantity });
    await user.update({ balance: user.balance - total_price });
    await category.update({ sold_product_amount: category.sold_product_amount + quantity});

    const transactionHistory = await TransactionHistory.create({
      quantity: quantity,
      UserId: user.id,
      ProductId: product.id,
      total_price: total_price
    });

    return res.status(201)
    .json({
      message: "You have successfully purchase the product",
      transactionBill: {
        total_price: helper.convertToIDR(transactionHistory.total_price),
        quantity: transactionHistory.quantity,
        product_name: product.title
      }
    })
  }
  catch(error){
    console.log(error.message);
    next(error);
  }
}

exports.getTransactions = async(req, res, next) => {
  try{
    const userId = req.user.id;

    const transactionHistories = await TransactionHistory.findAll({
      where: { UserId: userId },
      include: {
        model: Product,
        as: 'Product',
        attributes: ["id", "title", "price", "stock", "CategoryId"]
      }
    });

    return res.status(200)
    .json({
      transactionHistories: transactionHistories
    })
  }
  catch(error){
    next(error);
  }
}

exports.getTransactionsByAdmin = async(req, res, next) => {
  try{
    const transactionHistories = await TransactionHistory.findAll({
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: ["id", "title", "price", "stock", "CategoryId"]
        },
        {
          model: User,
          as: 'User',
          attributes: ["id", "email", "balance", "gender", "role"]
        }
      ]
    });

    return res.status(200)
    .json({
      transactionHistories: transactionHistories
    })
  }
  catch(error){
    console.log(error.message);
    next(error)
  }
}

exports.getTransactionById = async (req, res, next) => {
  try{
    const { transactionId } = req.params
    const transaction = await TransactionHistory.findOne({
      where: { id: transactionId },
      include: {
        model: Product,
        as: 'Product',
        attributes: ["id", "title", "price", "stock", "CategoryId"]
      }
    });

    transaction.total_price = helper.convertToIDR(transaction.total_price);
    transaction.Product.price = helper.convertToIDR(transaction.Product.price);

    return res.status(200)
    .json(transaction)
  }
  catch(error){
    console.log(error.message);
    next(error)
  }
}