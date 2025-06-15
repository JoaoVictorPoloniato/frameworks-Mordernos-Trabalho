// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Operações CRUD para produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', ProdutoController.listar);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', ProdutoController.cadastrar);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', ProdutoController.atualizar);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', ProdutoController.deletar);

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *           example: "5f8d04b3ab35de3a3427d9f3"
 *         nome:
 *           type: string
 *           description: Nome do produto
 *           example: "Notebook Gamer"
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *           example: 4999.99
 *         quantidade:
 *           type: integer
 *           description: Quantidade em estoque
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *           example: "2023-05-20T14:30:00Z"
 * 
 *     ProdutoInput:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - quantidade
 *       properties:
 *         nome:
 *           type: string
 *           example: "Notebook Gamer"
 *         preco:
 *           type: number
 *           format: float
 *           example: 4999.99
 *         quantidade:
 *           type: integer
 *           example: 10
 */

module.exports = router;