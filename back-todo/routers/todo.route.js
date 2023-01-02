const { Router } = require("express");
const { todosController } = require("../controllers/todo.controller");
const router = Router();

router.post("/todos", todosController.addTodo);
router.get("/todos", todosController.getTodo);
router.delete("/todos/:id", todosController.deleteTodo);
router.patch("/todos/:id", todosController.updateTodo);

module.exports = router;
