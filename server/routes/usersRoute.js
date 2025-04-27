const express = require("express")
const router = express.Router()
const User = require("../models/Users");
const usersControllers = require("../controllers/usersController")

router.get("/", usersControllers.getAllUsers)
router.post("/", usersControllers.createNewUser)
router.get("/getUserById", usersControllers.getUserById)
router.put("/", usersControllers.updateUser)
router.delete("/", usersControllers.deleteUser)

// router.post("/", async (req, res) => {
//     const { name } = req.body
//     const user = await User.create({ name: name });
//     res.json(user)
// })

module.exports = router