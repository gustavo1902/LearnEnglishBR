const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token do cabeçalho "Bearer <TOKEN>"
      token = req.headers.authorization.split(' ')[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Encontra o usuário no banco de dados e o anexa ao objeto req
      req.user = await User.findById(decoded.id).select('-password'); // Não retorna a senha

      next(); 
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token' });
  }
};

module.exports = protect;