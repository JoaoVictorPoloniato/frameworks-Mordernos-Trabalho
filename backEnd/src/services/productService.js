const produtoModel = require('../models/produtoModel')

const getAllProducts = async () => {
  return await produtoModel.listar()
}

const getProductById = async (id) => {
  const todos = await produtoModel.listar()
  const encontrado = todos.find((p) => p.id == id)
  if (!encontrado) throw new Error('Produto não encontrado')
  return encontrado
}

const createProduct = async (productData) => {
  const { nome, preco, cor, frasco } = productData
  if (!nome || !preco || !cor || !frasco) {
    throw new Error('Nome, preço, cor e frasco são obrigatórios')
  }
  return await produtoModel.cadastrar(productData)
}

const updateProduct = async (id, productData) => {
  return await produtoModel.atualizar(id, productData)
}

const deleteProduct = async (id) => {
  return await produtoModel.deletar(id)
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
