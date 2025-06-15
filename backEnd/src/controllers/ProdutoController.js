const productService = require('../services/productService')

class ProdutoController {
  static async listar(req, res) {
    try {
      const produtos = await productService.getAllProducts()
      res.json(produtos)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar produtos' })
    }
  }

  static async cadastrar(req, res) {
    try {
      const novoProduto = await productService.createProduct(req.body)
      res.status(201).json(novoProduto)
    } catch (error) {
      res.status(400).json({ erro: error.message })
    }
  }

  static async atualizar(req, res) {
    try {
      const produtoAtualizado = await productService.updateProduct(req.params.id, req.body)
      res.json(produtoAtualizado)
    } catch (error) {
      res.status(404).json({ erro: 'Produto não encontrado' })
    }
  }

  static async deletar(req, res) {
    try {
      await productService.deleteProduct(req.params.id)
      res.status(204).send()
    } catch (error) {
      res.status(404).json({ erro: 'Produto não encontrado' })
    }
  }
}

module.exports = ProdutoController
