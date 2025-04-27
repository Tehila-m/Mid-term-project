const express = require("express")
const router = express.Router()
const Post = require("../models/Post");
const postControllers = require("../controllers/postsController")

router.get("/", postControllers.getAllPosts)
router.post("/", postControllers.createNewPost)
router.get("/byId", postControllers.getPostById)
router.put("/", postControllers.updatePost)
router.delete("/", postControllers.deletePost)

// router.post("/", async (req, res) => {
//     const { name } = req.body
//     const post = await Post.create({ name: name });
//     res.json(post)
// })

module.exports = router