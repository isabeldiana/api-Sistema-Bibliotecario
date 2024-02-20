const express = require('express');
const users = require('./controllers/users');

const routers = express()
routers.post('/user', users.registerUser),
routers.get('/user/:id', users.displayLogin),
routers.put('/user/:id', users.updateUser),
routers.post('/user/:id', users.userLogin),
module.exports = routers