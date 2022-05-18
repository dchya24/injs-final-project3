const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hash = (string) => {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(string, salt);
}

exports.compare = (data, encrypted) => {
  return bcrypt.compareSync(data, encrypted)
}

exports.generateToken = (payload) => {
  return jwt.sign(payload, "SECRET!@#");
}

exports.convertToIDR = (integer) => {
  const idr = new Intl.NumberFormat("id-ID", { 
    style: 'currency', 
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(integer);

  return idr;
}