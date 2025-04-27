const User = require('../models/Users')

const getAllUsers = async (req, res) => {
    const allUsers = await User.find().lean()
    res.json(allUsers)
}

const createNewUser = async (req, res) => {
    console.log("createNewUser");
    const { userName, email, address, phone } = req.body
    const user = { userName, email, address, phone }
    const newUser = await User.create(user)
    res.json(newUser)
}

// const getUserById = async (req, res) => {
//         const { _id } = req.query; 
//         if (!_id) { return res.status(400).send("Missing user ID") }
//         const currentUser = await User.findById(_id).lean();
//         if (!currentUser)  return res.status(404).send("The required user is not found");
//         else res.json(currentUser);
// }

const getUserById = async (req, res) => {
    const { _id } = req.body; 
    if (!_id) { return res.status(400).send("Missing user ID") }
    const currentUser = await User.findById(_id).lean();
    if (!currentUser)  return res.status(404).send("The required user is not found");
    else res.json(currentUser);
}

const updateUser = async (req, res) => {
    const { _id, userName, email, address, phone } = req.body;
    const currentUser = await User.findById(_id)
    if (!currentUser)
        res.status(404).send("The required user is not found")
    currentUser.userName = userName
    currentUser.email = email
    currentUser.address = address
    currentUser.phone = phone
    const updatedUser = await currentUser.save()
    res.json(updatedUser)
}

const deleteUser = async (req, res) => {
    const { _id } = req.body
    const currentUser = await User.findByIdAndDelete(_id).exec()
    if (!currentUser) {
        return res.status(400).json({ message: 'The required user is not found' })
    }
    const reply = `User: '${currentUser.userName}' ID: ${currentUser._id} deleted`
    res.json(reply)
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}