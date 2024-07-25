const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
