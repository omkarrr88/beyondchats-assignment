// Main Express server with CORS for frontend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRoutes = require('./routes/articles');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/articles', articleRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));