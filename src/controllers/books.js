const pool = require("../../config")

const registerBooks = async(req, res)=>{
  const {autor, titulo, quantidade, numero_paginas, data_publicao,editora}=req.body
 try {
  const newBook = await pool.query("insert into books (autor, titulo, quantidade, numero_paginas, data_publicao,editora)  values ( $1,$2,$3,$4,$5,$6 )returning  *",[autor,titulo,  quantidade, numero_paginas, data_publicao,editora])
return res.status(201).json(newBook.rows[0]) 
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