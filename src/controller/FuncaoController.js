const Funcao = require('../models/Funcao');

const FuncaoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let funcoes = null;
      if (ativo == 1 ) {
        funcoes = await Funcao.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        funcoes = await Funcao.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(funcoes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova funcao
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaFuncao = await Funcao.create({nome, ativo });
      res.status(201).json(novaFuncao);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma funcao pelo ID
  async show (req, res) {
    try {
      const funcao = await Funcao.findById(req.params.id);
      if (funcao) {
        res.status(201).json(funcao);
      } else {
        res.status(404).json({ message: 'Funcao não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma funcao existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const funcao = await Funcao.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(funcao);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma funcao existente
  async delete(req, res) {
    try {
      const funcao = await Funcao.findByIdAndDelete(req.params.id);
      if (funcao) {
        const id = funcao._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Funcao não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = FuncaoController;

// Restante das funções CRUD para Funcao (getFuncao, updateFuncao, deleteFuncao)
