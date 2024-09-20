const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();

// Import the authenticateToken middleware
const authenticateToken = require('../middleware/auth'); // Path to the middleware

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  const { title, projectId } = req.body; // Expecting title and projectId in the request body
  try {
    const newTask = await prisma.task.create({
      data: { title, projectId },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { project: true }, // Include project details if needed
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Update a task by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, projectId } = req.body; // Expecting title and projectId in the request body
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, projectId },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete a task by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
