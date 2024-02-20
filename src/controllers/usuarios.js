const pool = require("../../config");
const bcrypt = require("bcrypt");
const cadastrarUsuarios =   async(req,res) =>{
const {nome, idade, telefone, email,senha}= req.body
try {
const senhaCriptografada = await bcrypt.hash(senha, 10);
const newUser = await pool.query('insert into users (nome, idade, telefone, email,senha) values ($1,$2,$3,$4,$5)returning *',[nome, idade, telefone, email,senhaCriptografada]  )
return res.status(201).json(newUser.rows[0])
} catch (error) {
  return res.status(500).json({message:"Erro interno do servidor"})
}
}

const exibirusuarioCadastrado = async (req, res) => {
  const {id}=req.params
 try {
  const user = await pool.query("select * from users where id= $1",[id])


  if(user.rowCount <1){
    return res.status(404).json({message: "Usuario não existente"})
  }
  const resultado = {
   nome: user.rows[0].nome,
   idade: user.rows[0].idade,
   telefone: user.rows[0].telefone,
   email: user.rows[0].email

  }
  return res.status(200).json(resultado)
 } catch (error) {
  console.log(error);
  return res.status(500).json({message:"Error interno do servidor"})
 }

}

module.exports = {cadastrarUsuarios, exibirusuarioCadastrado}