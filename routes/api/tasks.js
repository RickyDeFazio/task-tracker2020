const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Task Model
const Task = require('../../models/Task');

// @route   GET api/tasks
// @desc    Get All Tasks
// @access  Public
router.get('/', (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(tasks => res.json(tasks));
});

// @route   POST api/tasks
// @desc    Create A Task
// @access  Private
router.post('/', auth, (req, res) => {
  const newTask = new Task({
    name: req.body.name
  });

  newTask.save().then(task => res.json(task));
});

// @route   DELETE api/tasks/:id
// @desc    Delete A Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
