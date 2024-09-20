const jwt = require('jsonwebtoken');

function assinar(usuario) {
  const token = jwt.sign({ usuario }, process.env.CHAVE_SECRETA, {
    expiresIn: '1800s', // Expira em 30 minutos
  });
  return token;
}

function verificarAssinatura(token) {
  try {
    return jwt.verify(token, process.env.CHAVE_SECRETA);
  } catch (err) {
    throw new Error('Token inválido ou expirado');
  }
}

module.exports = { assinar, verificarAssinatura };
