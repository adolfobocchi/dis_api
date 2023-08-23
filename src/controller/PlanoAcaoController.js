const PlanoAcao = require('../models/PlanoAcao');

const PlanoAcaoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let planosAcao = null;
      if (ativo == 1 && page > 0) {
        planosAcao = await PlanoAcao.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        planosAcao = await PlanoAcao.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        planosAcao = await PlanoAcao.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        planosAcao = await PlanoAcao.find().sort({ nome: 1 })
      }
      res.status(200).json(planosAcao);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova planoAcao
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaPlanoAcao = await PlanoAcao.create({nome, ativo });
      res.status(201).json(novaPlanoAcao);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma planoAcao pelo ID
  async show (req, res) {
    try {
      const planoAcao = await PlanoAcao.findById(req.params.id);
      if (planoAcao) {
        res.status(201).json(planoAcao);
      } else {
        res.status(404).json({ message: 'PlanoAcao não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma planoAcao existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const planoAcao = await PlanoAcao.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(planoAcao);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma planoAcao existente
  async delete(req, res) {
    try {
      const planoAcao = await PlanoAcao.findByIdAndDelete(req.params.id);
      if (planoAcao) {
        const id = planoAcao._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'PlanoAcao não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = PlanoAcaoController;

// Restante das funções CRUD para PlanoAcao (getPlanoAcao, updatePlanoAcao, deletePlanoAcao)
