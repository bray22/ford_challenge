const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

require('dotenv').config();
// Import the authenticateToken middleware
const authenticateToken = require('../middleware/auth'); // Path to the middleware


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    const hashedPassword = await bcrypt.hash(password, 10);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

     const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
     expiresIn: '1h',
     });
    //const token = "111";

     res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

module.exports = router;
