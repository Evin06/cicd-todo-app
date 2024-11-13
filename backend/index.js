const express = require('express');
require('dotenv').config();  // Charge le fichier .env
const path = require('path');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || '3000';
const env = process.env.NODE_ENV || 'development';
const router = require('./routes');

console.info(`🚀🚀 Server running on port ${port} and env is ${env} 🚀🚀`);

require('./database');

const app = express();
app.use(express.static('../dist'));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
