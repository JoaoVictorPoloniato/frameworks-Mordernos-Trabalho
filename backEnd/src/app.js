// src/app.js
const express = require('express')
const cors = require('cors')                          
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./docs/swagger')
const produtoRoutes = require('./routes/produtoRoutes')
const authMiddleware = require('./middleware/auth')   

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))


app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/pocoes', authMiddleware, produtoRoutes)

module.exports = app
