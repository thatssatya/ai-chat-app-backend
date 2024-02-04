const express = require('express');
const routes = express.Router();
const controller = require('./controller');

routes.post('/chat', controller.handlePost);
routes.get('/', controller.handleGet);

module.exports = routes;
