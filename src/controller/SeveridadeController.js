const Severidade = require('../models/Severidade');

const SeveridadeController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let severidades = null;
      if (ativo == 1 && page > 0) {
        severidades = await Severidade.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        severidades = await Severidade.find().sort({ nome: 1 })
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        severidades = await Severidade.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        severidades = await Severidade.find().sort({ nome: 1 })
      }
      res.status(200).json(severidades);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova severidade
  async criar(req, res) {
    try {
      const {nome, valor, ativo } = req.body;
      const novaSeveridade = await Severidade.create({nome, valor, ativo });
      res.status(201).json(novaSeveridade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma severidade pelo ID
  async show (req, res) {
    try {
      const severidade = await Severidade.findById(req.params.id);
      if (severidade) {
        res.status(201).json(severidade);
      } else {
        res.status(404).json({ message: 'Severidade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma severidade existente
  async update(req, res) {
    try {
      const {nome, valor, ativo} = req.body;
      const severidade = await Severidade.findByIdAndUpdate(req.params.id, {nome, valor, ativo},  { new: true });
      res.status(201).json(severidade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma severidade existente
  async delete(req, res) {
    try {
      const severidade = await Severidade.findByIdAndDelete(req.params.id);
      if (severidade) {
        const id = severidade._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Severidade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = SeveridadeController;

// Restante das funções CRUD para Severidade (getSeveridade, updateSeveridade, deleteSeveridade)
