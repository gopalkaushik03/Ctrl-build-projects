const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const matchRoutes = require('./routes/match.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/match', matchRoutes);

module.exports = app;