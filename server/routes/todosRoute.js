const express = require("express")
const router = express.Router()
const Todos = require("../models/Todos");
const todosControllers = require("../controllers/TodosController")

router.get("/", todosControllers.getAllTodos)
router.post("/", todosControllers.createNewTodos)
router.get("/byId", todosControllers.getTodosById)
router.put("/", todosControllers.updateTodos)
router.put("/:_id", todosControllers.updateTodosComplete)
router.delete("/:id", todosControllers.deleteTodos)

// router.get("/getAllTodos", todosControllers.getAllTodos)
// router.post("/", todosControllers.createNewTodos)
// router.get("/byId", todosControllers.getTodosById)
// router.put("/", todosControllers.updateTodos)
// router.put("/:id", todosControllers.updateTodosComplete)
// router.delete("/", todosControllers.deleteTodos)

// router.post("/", async (req, res) => {
//     const { name } = req.body
//     const task = await Task.create({ name: name });
//     res.json(task)
// })

module.exports = router