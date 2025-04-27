const Photo = require('../models/Photos')

const getAllPhotos = async (req, res) => {
    const allPhotos = await Photo.find().lean()
    res.json(allPhotos)
}

const createNewPhoto = async (req, res) => {
    const { title, imageUrl } = req.body
    const photo = { title, imageUrl }
    const newPhoto = await Photo.create(photo)
    res.json(newPhoto)
}

const getPhotoById = async (req, res) => {
    const { id } = req.body
    const currentPhoto = await Photo.findById(id).lean()
    res.json(currentPhoto)
}

const updatePhoto = async (req, res) => {
    const { title, body } = req.body
    const currentPhoto = await Photo.findById(id)
    if (!currentPhoto)
        res.status(404).send("The required Photo is not found")
    currentPhoto.title = title
    currentPhoto.body = body
    const updatedPhoto = await currentPhoto.save()
    res.json(updatedPhoto)
}

const deletePhoto = async (req, res) => {
    const { id } = req.body
    const currentPhoto = await Photo.findByIdAndDelete(id).exec()
    if (!currentPhoto) {
        return res.status(400).json({ message: 'The required photo is not found' })
    }
    const reply = `post: '${currentPhoto.title}' deleted`
    res.json(reply)
}

module.exports = {
    getAllPhotos,
    createNewPhoto,
    getPhotoById,
    updatePhoto,
    deletePhoto
}
