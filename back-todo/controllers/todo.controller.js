const Todo = require("../models/Todo.model");

module.exports.todosController = {
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        text: req.body.text,
        isComplete: false,
      });
      return res.json(todo);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getTodo: async (req, res) => {
    try {
      const todo = await Todo.find();
      return res.json(todo);
    } catch (error) {
      return res.json(error);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      return res.json(req.params.id + " deleted");
    } catch (error) {
      return res.json(error);
    }
  },
  updateTodo: async (req, res) => {
    try {
      await Todo.findByIdAndUpdate(req.params.id, {
        isComplete: req.body.isComplete,
      });
      return res.json(isComplete);
    } catch (error) {
      return res.json(error);
    }
  },
};