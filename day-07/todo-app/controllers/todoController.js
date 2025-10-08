const Todo = require('../models/Todo');

exports.getAll = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

exports.create = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = await Todo.create({
    title,
    description,
    userId: req.user.id
  });
  res.status(201).json(todo);
};

exports.getOne = async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    userId: req.user.id
  });
  if (!todo) {
    return res.status(404).json({ error: 'To-do not found' });
  }
  res.json(todo);
};

exports.update = async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) {
    return res.status(404).json({ error: 'To-do not found' });
  }
  res.json(updated);
};

exports.remove = async (req, res) => {
  const deleted = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });
  if (!deleted) {
    return res.status(404).json({ error: 'To-do not found' });
  }
  res.json({ message: 'Deleted successfully' });
};
