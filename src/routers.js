const express = require('express');

const { filter } = require('./middleware/filterLogin');
const { registerBooks, displayBook } = require('./controllers/books');
const librarian = require('./controllers/librarian');

const routers = express()

routers.post('/user', librarian.registerLibrarian),
routers.post('/user/:id', librarian.loginLibrarian),

routers.use(filter)

routers.get('/user/:id', librarian.displayLogin),
routers.put('/user/:id', librarian.updateLibrarian),
routers.post('/book', registerBooks),
routers.get('/books', displayBook)

module.exports = routers