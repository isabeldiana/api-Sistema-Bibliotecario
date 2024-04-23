require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const swaggerUI =require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const app = express()

app.use(express.json())
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(routers)

app.listen(process.env.PORT)