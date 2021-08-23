const Users = require('../db/models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    })
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).send({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });    
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err });
    
    
  }
  // const { email, password } = req.body
  // console.log(req.body)
  // try {
  //   const admin = await Admin.create({ email, password });
  //   const token = jwt.sign(
  //     { user_id: admin._id, email },
  //     process.env.TOKEN_KEY,
  //     {
  //       expiresIn: "2h",
  //     }
  //   );
  //   // save user token
  //   // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  //   admin.token = token;


};
