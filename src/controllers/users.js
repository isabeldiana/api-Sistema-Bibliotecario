const pool = require("../../config");

const registerUser =   async(req,res) =>{
  const {nome, idade, telefone, email}= req.body
  try {
  const newUser = await pool.query('insert into users (nome, idade, telefone, email) values ($1,$2,$3,$4)returning *',[nome, idade, telefone, email]  )
  return res.status(201).json(newUser.rows[0])
  } catch (error) {
  
    return res.status(500).json({message:"Erro interno do servidor"})
  }
  }

  module.exports = {
    registerUser
  }