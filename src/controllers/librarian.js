require('dotenv').config()
const pool = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hash = process.env.JWT_HASH
const registerLibrarian =   async(req,res) =>{
const {nome, idade, telefone, email,senha}= req.body
try {
const unencryptedPass = await bcrypt.hash(senha, 10);
const newUser = await pool.query('insert into librarian (nome, idade, telefone, email,senha) values ($1,$2,$3,$4,$5)returning *',[nome, idade, telefone, email,unencryptedPass]  )
return res.status(201).json(newUser.rows[0])
} catch (error) {
  return res.status(500).json({message:"Erro interno do servidor"})
}
}
const loginLibrarian = async (req, res) => {
const {email, senha} = req.body
try {
  const userEmail = await pool.query("select * from librarian where email=$1",[email])
  if (userEmail.rowCount <1){
    return res.status(401).json({message:"Email ou a senha não conferem"})
  }
  const pass = await bcrypt.compare(senha, userEmail.rows[0].senha)
  if (!pass) {
    return res.status(401).json({ mensagem: "Email ou a senha não conferem" });   
   }

    const token = jwt.sign({ id: userEmail.rows[0].id }, hash, jwt.options);

    const { senha: _, ...userData} = userEmail.rows[0];

    return res.status(201).json({usuario:userData,token})
} catch (error) {
  return res.status(500).json({message:"Erro interno do servidor"})
}
}
const displayLogin = async (req, res) => {
const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];
  function decodeToken(token) {
    return jwt.verify(token, hash);
}
 try {
  
  const payload = decodeToken(token)
  const userId = payload.id;

 
  const user = await pool.query("select * from librarian where id= $1",[userId])

  if(user <1){
    return res.status(404).json({message: "Usuario não existente"})
  }
  const result = {
   nome: user.rows[0].nome,
   idade: user.rows[0].idade,
   telefone: user.rows[0].telefone,
   email: user.rows[0].email

  }
  return res.status(200).json(result)
 } catch (error) {
  return res.status(500).json({message:"Error interno do servidor"})
 }

}
const updateLibrarian = async(req,res)=>{
  const {nome, idade, telefone, email,senha}= req.body;
 try {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];
  function decodeToken(token) {
    return jwt.verify(token, hash);
}
const payload = decodeToken(token)
const userId = payload.id;


const user = await pool.query("select * from librarian where id= $1",[userId])

if(user <1){
  return res.status(404).json({message: "Usuario não existente"})
}
  const emailUser = await pool.query("select * from librarian where email =$1",[email])
  
  if(emailUser.rowCount >=1){
    return res.status(409).json({message:"Este email já está cadastrado"})
  }

  const unencryptedPass =  await bcrypt.hash(senha, 10)
  const updateLibrarian = await pool.query("update librarian set nome=$1,idade=$2, email=$3, telefone=$4, senha=$5 where id=$6 returning id, nome,idade, email,telefone",[nome, idade, email,telefone,unencryptedPass,userId])

 return res.status(201).json(updateLibrarian .rows[0])
 } catch (error) {
  return res.status(500).json({message:"Erro interno do servidor"})
 }
}
module.exports = { registerLibrarian , loginLibrarian,displayLogin,updateLibrarian}