const Risco = require('../models/Risco');

const RiscoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let riscos = null;
      if (ativo == 1 && page > 0) {
        riscos = await Risco.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
          .sort({nome: 1})
          .populate('causas')
          .populate('planosAcao')
      } else if (ativo == 0 && page > 0){
        riscos = await Risco.find()
        .limit(page * 10)
        .skip((page-1) * 10)
        .sort({nome: 1})
        .populate('causas')
        .populate('planosAcao')
      } else if( ativo == 1 && page == 0) {
        riscos = await Risco.find({ ativo: true }).sort({nome: 1})
        .populate('causas')
        .populate('planosAcao')
      } else if(ativo == 0 && page == 0) {
        riscos = await Risco.find().sort({nome: 1})
        .populate('causas')
        .populate('planosAcao')
      }
      res.status(200).json(riscos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova risco
  async criar(req, res) {
    try {
      const {nome, viasAbsorcao, agentesRisco, causas, planosAcao, ativo } = req.body;
      const novaRisco = await Risco.create({nome, viasAbsorcao, agentesRisco, causas, planosAcao, ativo });
      const risco = await Risco.findById(novaRisco._id)
      .populate('causas')
      .populate('planosAcao')
      res.status(201).json(risco);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma risco pelo ID
  async show (req, res) {
    try {
      const risco = await Risco.findById(req.params.id);
      if (risco) {
        res.status(201).json(risco);
      } else {
        res.status(404).json({ message: 'Risco não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma risco existente
  async update(req, res) {
    try {
      const {nome, viasAbsorcao, agentesRisco, causas, planosAcao, ativo} = req.body;
      const risco = await Risco.findByIdAndUpdate(req.params.id, {nome, viasAbsorcao, agentesRisco, causas, planosAcao, ativo},  { new: true })
      .populate('causas')
      .populate('planosAcao');
      res.status(201).json(risco);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma risco existente
  async delete(req, res) {
    try {
      const risco = await Risco.findByIdAndDelete(req.params.id);
      if (risco) {
        const id = risco._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Risco não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = RiscoController;

// Restante das funções CRUD para Risco (getRisco, updateRisco, deleteRisco)
