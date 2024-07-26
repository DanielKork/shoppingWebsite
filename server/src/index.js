const express = require('express');
const connectDB = require('./db');
const items = require('./routes/items');
const auth = require('./routes/auth');
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

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const connectDB = require('./db');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// app.get('/api', (req, res) => {
//   res.send({ message: 'Hello from the server!' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`); 
// });
