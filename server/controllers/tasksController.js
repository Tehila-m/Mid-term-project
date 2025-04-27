const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    const allTasks = await Task.find().lean()
    res.json(allTasks)
}

const createNewTask = async (req, res) => {
    const { name, complete, important, tags, icon, taskDate } = req.body
    const task = { name, complete, important, tags, icon, taskDate }
    const newTask = await Task.create(task)
    res.json(newTask)
}

const getTaskById = async (req, res) => {
    const { id } = req.body
    const mytask = await Task.findById(id).lean()
    res.json(mytask)
}

const updateTask = async (req, res) => {
    const { id, name, complete, important, tags, icon } = req.body
    const mytask = await Task.findById(id)
    if (!mytask)
        res.status(404).send("The required task is not found")
    mytask.name = name
    mytask.complete = complete
    mytask.important = important
    mytask.tags = tags
    mytask.icon = icon
    const updatetask = await mytask.save()
    res.json(updatetask)
}

const updateTaskComplete = async (req, res) =>{
    const {id} = req.params
    const task = await Task.findById(id).exec()
    if(!task)   return res.status(400).json({message: `The task number ${id}, is not found`})
    task.complete = !task.complete
    const updatedTask = await task.save()
    res.json(`${updatedTask.name} updated`)
}
// const updateTaskComplete = async (req, res) => {
//     const { id } = req.params
//     const task = await Task.findById(id).exec()
//     if (!task) {
//         return res.status(400).json({ message: 'Task not found' })
//     }
//     task.complete = !task.complete
//     const updatedTask = await task.save()
//     res.json(`'${updatedTask.name}' updated`)
// }

const deleteTask = async (req, res) => {
    const { id } = req.body
    const task = await Task.findById(id).exec()
    if (!task) {
        return res.status(400).json({ message: 'Task not found' })
    }
    const result = await task.deleteOne()
    const reply = `Task '${task.name}' ID ${task._id} deleted`
    res.json(reply)
}

module.exports = {
    getAllTasks,
    createNewTask,
    getTaskById,
    updateTask,
    updateTaskComplete,
    deleteTask
}
