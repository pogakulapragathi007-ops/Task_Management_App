const Task = require("../models/Task");

const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id,
  });

  res.json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  task.status = req.body.status || task.status;
  await task.save();

  res.json(task);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};