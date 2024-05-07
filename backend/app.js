const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

module.exports = app;
