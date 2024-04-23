
create database biblioteca;
create table librarian (
  id serial PRIMARY KEY,
nome text, idade integer, telefone integer, email varchar(255), senha varchar(255)
);
create table users (
  id serial PRIMARY KEY,
  nome text, idade integer, telefone integer, email varchar(255)
);
create table books(
  
  id serial PRIMARY KEY,
  titulo text,
autor text, quantidade integer,estoque integer, numero_paginas integer, data_publicao date ,editora text
);
CREATE TABLE loan_books (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES users(id),
    quantidade INTEGER,
    id_livro INT REFERENCES books(id),
    data_emprestimo DATE,
    situacao TEXT
);

CREATE TABLE devolution (
    id SERIAL PRIMARY KEY,
    id_emprestimo INT REFERENCES loan_books(id),
    id_livro INT REFERENCES books(id),
  quantidade INTEGER,
    data_devolucao DATE,
    situacao TEXT
)






