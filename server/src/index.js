const express = require('express');
const connectDB = require('./db');
const items = require('./routes/items');
const auth = require('./routes/auth');
const users = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/items', items);
app.use('/api/auth', auth);
app.use('/api/users', users); 

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});