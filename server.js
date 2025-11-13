const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Prevent caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// API routes
app.use('/api', middlewares, router);

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/angular-task-manager')));

// Angular routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-task-manager/index.html'));
});

// ✅ Export the app for Vercel
module.exports = app;