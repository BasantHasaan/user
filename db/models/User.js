const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validator: (isEmail, "please enter valid Email"),
  },
  fullName: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "please enter password"],
    minLength: [8, "password minLength is 8 character"],
  },
  role: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Users = mongoose.model('users', userSchema)

module.exports = Users