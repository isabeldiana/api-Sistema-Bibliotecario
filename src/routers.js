const express = require('express');

const { filter } = require('./middleware/filterLogin');
const { registerBooks, displayBook } = require('./controllers/books');
const librarian = require('./controllers/librarian');
const { registerUser } = require('./controllers/users');
const { loanBooks } = require('./controllers/loan_books');
const { devolution } = require('./controllers/devolution_books');

const routers = express()

routers.post('/librarian', librarian.registerLibrarian),
routers.post('/librarian/:id', librarian.loginLibrarian),

routers.use(filter)

routers.get('/librarian/:id', librarian.displayLogin),
routers.put('/librarian/:id', librarian.updateLibrarian),
routers.post('/book', registerBooks),
routers.get('/books', displayBook),
routers.post('/user', registerUser),
routers.post('/loan', loanBooks),
routers.post('/devolution', devolution),

module.exports = routers