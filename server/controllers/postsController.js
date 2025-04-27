const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
    const allPosts = await Post.find().lean()
    res.json(allPosts)
}

const createNewPost = async (req, res) => {
    const { title, body } = req.body
    const post = { title, body }
    const newPost = await Post.create(post)
    res.json(newPost)
}

const getPostById = async (req, res) => {
    const { id } = req.body
    const currentPost = await Post.findById(id).lean()
    res.json(currentPost)
}

const updatePost = async (req, res) => {
    const { title, body } = req.body
    const currentPost = await Post.findById(id)
    if (!currentPost)
        res.status(404).send("The required post is not found")
    currentPost.title = title
    currentPost.body = body
    const updatedPost = await currentPost.save()
    res.json(updatedPost)
}

const deletePost = async (req, res) => {
    const { id } = req.body
    const currentPost = await Post.findByIdAndDelete(id).exec()
    if (!currentPost) {
        return res.status(400).json({ message: 'The required post is not found' })
    }
    const reply = `post: '${currentPost.title}' deleted`
    res.json(reply)
}

module.exports = {
    getAllPosts,
    createNewPost,
    getPostById,
    updatePost,
    deletePost
}
