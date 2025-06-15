// src/models/produtoModel.js
const { v4: uuidv4 } = require('uuid');

let produtos = [];

class Produto {
  static listar() {
    return produtos;
  }

  static cadastrar(dados) {
    const novoProduto = {
      id: uuidv4(),
      ...dados
    };
    produtos.push(novoProduto);
    return novoProduto;
  }

  static atualizar(id, dados) {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...dados };
      return produtos[index];
    }
    return null;
  }

  static deletar(id) {
    produtos = produtos.filter(p => p.id !== id);
    return true;
  }
}

module.exports = Produto;