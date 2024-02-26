const pool = require("../../config")

const loanBooks = async(req,res)=>{
  const {usuario_id, quantidade, id_livro, data_emprestimo, situacao} = req.body

  try {
    const book = await pool.query("select * from books where id=$1", [id_livro])
    const user = await pool.query("select * from users where id=$1", [usuario_id])
    if(book.rowCount < 1){
      return res.status(401).json({message:"Este livro não existe"})
    } 
    if(user.rowCount < 1){
      return res.status(401).json({message:"Usuario não existe"})
    } 

    

    if(book.rows[0].estoque < quantidade){
      return res.status(400).json({message:"Estoque insuficiente"})

    }

    if(situacao !== "Emprestado" ){
      return res.status(400).json({message:"Situacao precisa ser descrita como Emprestado"})
    }
    const newLoan = await pool.query("insert into loan_books(usuario_id, quantidade, id_livro, data_emprestimo, situacao) values($1,$2,$3,$4,$5) returning*",[usuario_id, quantidade, id_livro, data_emprestimo, situacao] )
    const stock = await pool.query("update books set estoque = estoque - $1 where id =$2 returning *",[quantidade,id_livro])
    
    result ={
      nome: user.rows[0].nome,
      id_livro, 
      titulo: book.rows[0].titulo,
      quantidade,
      data_emprestimo, 
      situacao

    }
    return res.status(201).json(result)
  } catch (error) {
    
    return res.status(500).json({message:"Erro interno do servidor"})
  }
}
module.exports = {loanBooks}