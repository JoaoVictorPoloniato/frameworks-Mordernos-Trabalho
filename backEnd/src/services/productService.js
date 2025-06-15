// src/services/productService.js
const productModel = require('../models/productModel');

const getAllProducts = () => {
  return productModel.findAll();
};

const getProductById = (id) => {
  const product = productModel.findById(id);
  if (!product) {
    throw new Error('Produto não encontrado');
  }
  return product;
};

const createProduct = (productData) => {
  // Validação simples
  if (!productData.name || !productData.price) {
    throw new Error('Nome e preço são obrigatórios');
  }
  return productModel.create(productData);
};

const updateProduct = (id, productData) => {
  const product = productModel.update(id, productData);
  if (!product) {
    throw new Error('Produto não encontrado');
  }
  return product;
};

const deleteProduct = (id) => {
  const product = productModel.findById(id);
  if (!product) {
    throw new Error('Produto não encontrado');
  }
  productModel.remove(id);
  return { message: 'Produto removido com sucesso' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};