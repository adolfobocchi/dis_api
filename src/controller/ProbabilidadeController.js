const Probabilidade = require('../models/Probabilidade');

const ProbabilidadeController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let probabilidades = null;
      if (ativo == 1 ) {
        probabilidades = await Probabilidade.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        probabilidades = await Probabilidade.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(probabilidades);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova probabilidade
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaProbabilidade = await Probabilidade.create({nome, ativo });
      res.status(201).json(novaProbabilidade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma probabilidade pelo ID
  async show (req, res) {
    try {
      const probabilidade = await Probabilidade.findById(req.params.id);
      if (probabilidade) {
        res.status(201).json(probabilidade);
      } else {
        res.status(404).json({ message: 'Probabilidade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma probabilidade existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const probabilidade = await Probabilidade.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(probabilidade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma probabilidade existente
  async delete(req, res) {
    try {
      const probabilidade = await Probabilidade.findByIdAndDelete(req.params.id);
      if (probabilidade) {
        const id = probabilidade._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Probabilidade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = ProbabilidadeController;

// Restante das funções CRUD para Probabilidade (getProbabilidade, updateProbabilidade, deleteProbabilidade)
