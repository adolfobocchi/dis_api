const Proposta = require('../models/Proposta');

const PropostaController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let propostas = null;
      if (ativo == 1 && page > 0) {
        propostas = await Proposta.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else if (ativo == 0 && page > 0){
        propostas = await Proposta.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      } else if( ativo == 1 && page == 0) {
        propostas = await Proposta.find({ ativo: true })
      } else if(ativo == 0 && page == 0) {
        propostas = await Proposta.find()
      }
      res.status(200).json(propostas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova proposta
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaProposta = await Proposta.create({nome, ativo });
      res.status(201).json(novaProposta);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma proposta pelo ID
  async show (req, res) {
    try {
      const proposta = await Proposta.findById(req.params.id);
      if (proposta) {
        res.status(201).json(proposta);
      } else {
        res.status(404).json({ message: 'Proposta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma proposta existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const proposta = await Proposta.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(proposta);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma proposta existente
  async delete(req, res) {
    try {
      const proposta = await Proposta.findByIdAndDelete(req.params.id);
      if (proposta) {
        const id = proposta._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Proposta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = PropostaController;

// Restante das funções CRUD para Proposta (getProposta, updateProposta, deleteProposta)
