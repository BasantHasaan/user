const jwt = require("jsonwebtoken");
const Users = require('../db/models/User')
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
const isAdmin = async (req, res, next) => { 
  // console.log(req.user.id)
  try {
    const user = await Users.findById(req.user.id)
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (!user.isAdmin) {
      return res.status(403).send({ message: "Require Admin Role!" });
     
    }
    return next();
  } catch (err) {
    console.log(err,";err")
    return res.status(500).send({ message: err });
      
  }
    
};

module.exports = { verifyToken, isAdmin };
