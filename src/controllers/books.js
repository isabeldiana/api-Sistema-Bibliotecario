const pool = require("../../config")

const registerBooks = async(req, res)=>{
  const {autor, titulo, quantidade, numero_paginas, data_publicao,editora}=req.body
 try {
   const existBook  = await pool.query("select * from books where autor = $1 and titulo = $2",[autor, titulo])
   console.log(existBook.rows[0]);
   if (existBook.rows.length > 0) {
    const existingBook = existBook.rows[0];
    const addStock = await pool.query("UPDATE books SET quantidade = quantidade + $1, estoque = estoque + $2 WHERE id = $3 RETURNING *", [quantidade, quantidade, existingBook.id]);
    return res.status(201).json(addStock.rows[0]);
}else {
  const newsStock = 0;
  const newBook = await pool.query("INSERT INTO books (autor, titulo, quantidade,estoque, numero_paginas, data_publicao, editora) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *", [autor, titulo, quantidade,newsStock, numero_paginas, data_publicao, editora]);

  const insertedBook = newBook.rows[0];
  const stock = await pool.query("UPDATE books SET estoque = estoque + $1 WHERE id = $2 RETURNING *", [quantidade, insertedBook.id]);

  return res.status(201).json(stock.rows[0]);
   }
  
} catch (error) {

  return res.status(500).json({message:"Erro interno do servidor"})
 }
}
const displayBook = async (req, res) => {
  try {
    const book = await pool.query("select * from books")

console.log(book);
   return res.status(200).json(book.rows)
  } catch (error) {
    console.log(error);
  return res.status(500).json({message:"Erro interno do servidor"})
  }
}

module.exports = {
  registerBooks,displayBook
}