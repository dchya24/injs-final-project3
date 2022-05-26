const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/users.routes");
const productRouter = require("./routes/products.routes");
const categoryRouter = require("./routes/categories.routes");

app.use(express.json());


app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use((err, res, next) => {
  console.log(err);
  return res.status(500)
    .json({
      message: err.message
    });
});

app.listen(PORT, () => {
  console.log(`Server runnit at ${PORT}`)
})