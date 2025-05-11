const express = require('express');
const app = express();
const RoutesApp = require('./todoApp.js');

app.use('/todo-app', RoutesApp);

module.exports = app;