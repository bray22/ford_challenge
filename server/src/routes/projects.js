const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();

// Import the authenticateToken middleware
const authenticateToken = require('../middleware/auth'); // Path to the middleware

// Create a new project
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { title, description },
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Get all projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Update a project by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete a project by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

module.exports = router;
