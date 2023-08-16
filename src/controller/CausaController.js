const Causa = require('../models/Causa');

const CausaController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let causas = null;
      if (ativo == 1 && page > 0) {
        causas = await Causa.find({ ativo: true }).populate('risco')
          .limit(page * 10)
          .skip((page-1) * 10)
      } else if (ativo == 0 && page > 0){
        causas = await Causa.find().populate('risco')
        .limit(page * 10)
        .skip((page-1) * 10)
      } else if( ativo == 1 && page == 0) {
        causas = await Causa.find({ ativo: true }).populate('risco')
      } else if(ativo == 0 && page == 0) {
        causas = await Causa.find().populate('risco')
      }
      console.log(causas);
      res.status(200).json(causas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova causa
  async criar(req, res) {
    try {
      const {nome, risco, ativo } = req.body;
      const novaCausa = await Causa.create({nome, risco, ativo });
      const causa = await Causa.findById(novaCausa._id).populate('risco');
      res.status(201).json(causa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma causa pelo ID
  async show (req, res) {
    try {
      const causa = await Causa.findById(req.params.id).populate('risco');
      if (causa) {
        res.status(201).json(causa);
      } else {
        res.status(404).json({ message: 'Causa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma causa existente
  async update(req, res) {
    try {
      const {nome, risco, ativo} = req.body;
      const causa = await Causa.findByIdAndUpdate(req.params.id, {nome, risco, ativo},  { new: true }).populate('risco');
      res.status(201).json(causa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma causa existente
  async delete(req, res) {
    try {
      const causa = await Causa.findByIdAndDelete(req.params.id);
      if (causa) {
        const id = causa._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Causa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = CausaController;

// Restante das funções CRUD para Causa (getCausa, updateCausa, deleteCausa)
