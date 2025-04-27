const Todos = require('../models/Todos')

const getAllTodos = async (req, res) => {
    const allTodos = await Todos.find().lean()
    res.json(allTodos)
}


const createNewTodos = async (req, res) => {
    console.log("createNewTodo");
    const { title, tags, complete } = req.body
    const todos = { title, tags, complete }
    const newTodos = await Todos.create(todos)
    res.json(newTodos)
}

const getTodosById = async (req, res) => {
    const { _id } = req.body
    if (!_id) { return res.status(400).send("Missing user ID") }
    const currentTodos = await Todos.findById(_id).lean()
    if (!currentTodos) return res.status(404).send("The required todos is not found");
    res.json(currentTodos)
}


const updateTodos = async (req, res) => {
    const { _id, title, tags, complete } = req.body
    const currentTodos = await Todos.findById(_id)
    if (!currentTodos)  return res.status(404).send("The required todos is not found")
    currentTodos.title = title
    currentTodos.tags = tags
    currentTodos.complete = complete
    const updateTodos = await currentTodos.save()
    res.json(updateTodos)
}

const updateTodosComplete = async (req, res) => {
    const { _id } = req.params
    const todos = await Todos.findById(_id).exec()
    if (!todos) return res.status(400).json({ message: `The todos number ${_id}, is not found` })
    todos.complete = !todos.complete
    const updatedTodos = await todos.save()
    res.json(`${updatedTodos.title} updated`)
}

const deleteTodos = async (req, res) => {
    const { id } = req.params
    const currentTodos = await Todos.findByIdAndDelete(id).exec()
    if (!currentTodos) {
        return res.status(400).json({ message: 'The required Todos is not found' })
    }
    const reply = `Todo: '${currentTodos.title}' ID: ${currentTodos.id} deleted`
    res.json(reply)
}

module.exports = {
    getAllTodos,
    createNewTodos,
    getTodosById,
    updateTodos,
    updateTodosComplete,
    deleteTodos
}


