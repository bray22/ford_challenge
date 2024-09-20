const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
const cors = require('cors');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const prisma = new PrismaClient(); // Initialize PrismaClient


const app = express();
// Use CORS middleware
app.use(cors()); // Use with default settings, allowing all origins

app.use(express.json()); // Middleware to parse JSON requests
app.use('/api/auth', authRoutes); // auth routes
app.use('/api/project', projectRoutes); // Project management routes
app.use('/api/task', taskRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
