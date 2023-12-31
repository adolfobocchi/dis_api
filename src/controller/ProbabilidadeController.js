const Probabilidade = require('../models/Probabilidade');

const ProbabilidadeController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let probabilidades = null;
      if (ativo == 1 && page > 0) {
        probabilidades = await Probabilidade.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        probabilidades = await Probabilidade.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        probabilidades = await Probabilidade.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        probabilidades = await Probabilidade.find().sort({ nome: 1 })
      }
      res.status(200).json(probabilidades);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova probabilidade
  async criar(req, res) {
    try {
      const {nome, valor, ativo } = req.body;
      const novaProbabilidade = await Probabilidade.create({nome, valor, ativo });
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
      const {nome, valor, ativo} = req.body;
      const probabilidade = await Probabilidade.findByIdAndUpdate(req.params.id, {nome, valor, ativo},  { new: true });
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
