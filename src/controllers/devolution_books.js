const devolution = async (req, res )=>{
  const {id_emprestimo, id_livro,quantidade,  data_devolucao, situacao}=req.body
   try {
    
   } catch (error) {
    
    return res.status(500).json({message:"Erro interno do servidor"})
   }
}