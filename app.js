const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API!');
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
