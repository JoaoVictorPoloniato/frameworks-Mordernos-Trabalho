const db = require('../config/database')

class Produto {
  static async listar() {
    const [rows] = await db.query('SELECT * FROM pocoes')
    return rows
  }

  static async cadastrar(dados) {
    const { nome, preco, cor, frasco, descricao } = dados
    const [result] = await db.query(
      'INSERT INTO pocoes (nome, preco, cor, frasco, descricao) VALUES (?, ?, ?, ?, ?)',
      [nome, preco, cor, frasco, descricao]
    )
    return { id: result.insertId, ...dados }
  }

  static async atualizar(id, dados) {
    const { nome, preco, cor, frasco, descricao } = dados
    await db.query(
      'UPDATE pocoes SET nome = ?, preco = ?, cor = ?, frasco = ?, descricao = ? WHERE id = ?',
      [nome, preco, cor, frasco, descricao, id]
    )
    return { id, ...dados }
  }

  static async deletar(id) {
    await db.query('DELETE FROM pocoes WHERE id = ?', [id])
    return true
  }
}

module.exports = Produto
