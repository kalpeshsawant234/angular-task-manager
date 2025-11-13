const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 🔒 Prevent caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// 🛠️ API routes
app.use('/api', middlewares, router);

// 🌐 Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/task-manager')));

// 🔁 Fallback for Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/task-manager/index.html'));
});

// 🚀 Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));