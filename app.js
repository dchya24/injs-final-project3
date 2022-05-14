const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());


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