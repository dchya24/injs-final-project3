const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["token"];

  jwt.verify(token,"SECRET!@#", (err, decoded) => {
    if(err){
      return res.status(401)
      .json({ message: "Unaouthorized!" });
    }

    req.user = decoded;
    next();
  });
}

exports.isAdmin = (req, res, next) => {
  if(req.user.role != "admin"){
    return res.status(401)
      .json({ message: "Unaouthorized!" });
  }
  next();
}