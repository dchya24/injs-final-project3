const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/users.routes");
const productRouter = require("./routes/products.routes");
const categoryRouter = require("./routes/categories.routes");
const transactionRouter = require("./routes/transactions.routes");

app.use(express.json());


app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500)
    .json({
      message: err.message
    });
});

app.listen(PORT, () => {
  console.log(`Server runnit at ${PORT}`)
})