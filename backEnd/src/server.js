// src/server.js
const app = require('./app');
const PORT = 3103;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});