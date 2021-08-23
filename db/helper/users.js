const mongoose = require("mongoose");
const Users = require("../models/User");

const getUsers = async ()=>{
  return await Users.find();
  
}


const deleteUser = async (id) => {
    return await Users.findByIdAndRemove({ _id: id });

};

const getUser = async (id) => {
  try {
    return await Users.find({_id: id});
  } catch (err) {
    return err;
  }
};
const updateUser = async (id) => {
  try {
    return await Users.findByIdAndUpdate({ _id: id })
  } catch (err) {
    return err;
  }
};
const createUser = async ({email, password, fullName, userType}) => {
     const user = new Users({
       email,
       password,
       fullName,
       userType,
     });
  
    return await user.save();

};



module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser
};
