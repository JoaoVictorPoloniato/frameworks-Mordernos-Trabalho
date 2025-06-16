// backend/src/middleware/auth.js
const admin = require('firebase-admin')
const serviceAccount = require('../config/serviceAccountKey.json')

// Inicializa o Firebase Admin apenas uma vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

// Middleware que verifica o token Bearer na requisição
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/^Bearer (.+)$/)
  if (!match) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }
  const idToken = match[1]

  try {
    // Verifica e decodifica o ID token
    const decoded = await admin.auth().verifyIdToken(idToken)
    req.user = decoded   // opcional: você pode usar os dados do usuário depois
    next()
  } catch (err) {
    console.error('Falha ao verificar token Firebase:', err)
    res.status(401).json({ erro: 'Não autorizado' })
  }
}
