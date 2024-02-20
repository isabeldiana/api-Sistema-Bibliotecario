const express = require('express');
const users = require('./controllers/usuarios');

const routers = express()
routers.post('/user', users.cadastrarUsuarios),
routers.get('/user/:id', users.exibirusuarioCadastrado)
module.exports = routers