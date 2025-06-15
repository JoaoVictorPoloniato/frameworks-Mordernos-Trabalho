// src/app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Middleware
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/produtos', produtoRoutes);

module.exports = app;