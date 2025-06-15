// src/controllers/produtoController.js
const Produto = require('../models/produtoModel');

class ProdutoController {
  static listar(req, res) {
    res.json(Produto.listar());
  }

  static cadastrar(req, res) {
    const { nome, preco, quantidade } = req.body;
    if (!nome || !preco || !quantidade) {
      return res.status(400).json({ erro: "Dados incompletos!" });
    }
    res.status(201).json(Produto.cadastrar(req.body));
  }

  static atualizar(req, res) {
    const produto = Produto.atualizar(req.params.id, req.body);
    produto ? res.json(produto) : res.status(404).json({ erro: "Produto não encontrado!" });
  }

  static deletar(req, res) {
    Produto.deletar(req.params.id);
    res.status(204).send();
  }
}

module.exports = ProdutoController;