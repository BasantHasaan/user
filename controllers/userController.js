const { getUser, getUsers, deleteUser, updateUser, createUser } = require('../db/helper/users');
const Users = require("../db/models/User");



exports.createUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
    }
    try {
      const user = await createUser(req.body);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({
      message: err.message || "Error Occured",
    });
  }

};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
  if (!users) {
      return res.status(404).send({
        message: "No data available",
      });
    }
    res.status(200).send(users);
  } catch (err) {
    console.log(err)
    res.status(500).send({
    message: err.message || "Error Occured",
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await getUser();
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id,
      });
    }
    res.status(200).send(user);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error Occured",
    });
  }
};


exports.updateUser = async (req, res, next)=>{
  const user = {
    name: req.body.name,
    description: req.body.description,
  };
     try {
       const data = await updateUser(req.params.id);
       res.json({
         users: users,
       });
     } catch (err) {
       res.status(500).send({
         message: err.message || "Error Occured",
       });
     }

};

exports.removeUser = async (req, res, next) => {
    try {
      const user = await deleteUser(req.params.id);
      res.send({ message: "User deleted successfully!" })
    } catch (err) {
      res.status(500).send({
        message: "Could not delete user "
      });
    }
};
