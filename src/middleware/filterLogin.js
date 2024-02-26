const jwt = require('jsonwebtoken');
const pool = require('../../config');
const hash = process.env.JWT_HASH


const filter = async(req,res,next)=>{
  const {authorization}= req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Usuário não autorizado" });
  }
  
  const token = authorization.split(' ')[1];
    try {
    const {id} = jwt.verify(token, hash)
    const { rows, rowCount } = await pool.query('select * from librarian where id = $1', [id] )
        

    if (rowCount< 1) { 
    
        return res.status(401).json({mensagem: "Usuario não Existe"});
    }
    
    const {senha, ...usuario } = rows[0]
    
    req.usuario = usuario
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({mensagem: "Para acessar este recurso, um token de autenticação válido deve ser enviado."})   

  }
}

module.exports ={
  filter
}