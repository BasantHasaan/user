const { Router } = require("express");
const Users = require("../controllers/userController");
const router = Router();

router.get("/:id", Users.getUser);
router.post("/", Users.createUser);
router.get("/", Users.getUsers);
router.put("/id", Users.updateUser);
router.delete("/:id", Users.removeUser);

module.exports = router;
