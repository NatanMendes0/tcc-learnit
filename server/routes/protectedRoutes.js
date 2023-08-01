const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware para proteger as rotas
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decoded.userId;
    next();
  });
}

// Rota protegida
router.get('/homepage', verifyToken, (req, res) => {
  // Aqui você pode retornar os dados que deseja exibir na homepage para o usuário logado
  res.json({ message: 'Bem-vindo à homepage!' });
});

module.exports = router;
