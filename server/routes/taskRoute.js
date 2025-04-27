const express = require("express")
const router = express.Router()
const Task = require("../models/Task");
const taskControllers = require("../controllers/tasksController")

router.get("/", taskControllers.getAllTasks)
router.post("/", taskControllers.createNewTask)
router.get("/byId", taskControllers.getTaskById)
router.put("/", taskControllers.updateTask)
router.put("/:id", taskControllers.updateTaskComplete)
router.delete("/", taskControllers.deleteTask)

router.post("/", async (req, res) => {
    const { name } = req.body
    const task = await Task.create({ name: name });
    res.json(task)
})

module.exports = router