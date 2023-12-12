const Todo = require("../models/todoModels");
const mongoose = require("mongoose");

const getTodos = async (req, res) => {
  const todo = await Todo.find({}).sort({ createdAt: -1 });

  res.status(200).json(todo);
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const todo = await Todo.create({ title });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No such todo");
  }

  const todo = await Todo.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json("No such todo");
  }

  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No such todo");
  }

  const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!todo) {
    return res.statu(400).json("No such workout");
  }

  res.status(200).json(todo);
};

module.exports = {
  getTodo,
  getTodos,
  deleteTodo,
  createTodo,
  updateTodo,
};
