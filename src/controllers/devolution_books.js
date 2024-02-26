const pool = require("../../config")

const devolution = async (req, res )=>{
  const {id_emprestimo, id_livro,quantidade,  data_devolucao, situacao}=req.body
   try {
    const loanBooks = await pool.query("select * from loan_books where id=$1", [id_emprestimo]);

   
    if(loanBooks.rowCount < 1){
      return res.status(401).json({message:"Não existe emprestimo com este id"})
    }
    
    if(loanBooks.rows[0].id_livro !== id_livro ){
      return res.status(401).json({message:"Não existe emprestimo com este livro "})
    }

    if(situacao !== "Devolvido"){
      return res.status(400).json({message:"A situação precisa ser descrita como: Devolvido"})
    }
    const quantidadeEmprestada = loanBooks.rows[0].quantidade;

    if(quantidadeEmprestada!== quantidade ){
      return res.status(400).json({message:"Quantidade a ser devolvida precisa ser a mesma que foi emprestada"})

    }

    const loan = await pool.query("select * from devolution where id_emprestimo =$1", [id_emprestimo])
  if(loan.rowCount > 0){
    return res.status(400).json({message:"Já existe devolução para este emprestimo"})
  }
    const devolution  =  await pool.query("insert into devolution (id_emprestimo, id_livro,quantidade,  data_devolucao, situacao) values($1,$2,$3,$4,$5)", [id_emprestimo, id_livro,quantidade,  data_devolucao, situacao]);
    const stock = await pool.query("update books set estoque = estoque + $1 where id =$2 returning *",[quantidade,id_livro]);
    const statusLoan = await pool.query("update loan_books set situacao = $1 where id =$2",[situacao, id_emprestimo]);

    const result = {
      id_emprestimo, 
      id_livro,
      quantidade,  
      data_devolucao, 
      situacao
    };
    return res.status(201).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Erro interno do servidor"})
   }
}

module.exports={
  devolution
}