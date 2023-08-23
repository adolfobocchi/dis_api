const Perigo = require('../models/Perigo');

const PerigoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let perigos = null;
      if (ativo == 1 && page > 0) {
        perigos = await Perigo.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        perigos = await Perigo.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        perigos = await Perigo.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        perigos = await Perigo.find().sort({ nome: 1 })
      }
      res.status(200).json(perigos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova perigo
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaPerigo = await Perigo.create({nome, ativo });
      res.status(201).json(novaPerigo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma perigo pelo ID
  async show (req, res) {
    try {
      const perigo = await Perigo.findById(req.params.id);
      if (perigo) {
        res.status(201).json(perigo);
      } else {
        res.status(404).json({ message: 'Perigo não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma perigo existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const perigo = await Perigo.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(perigo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma perigo existente
  async delete(req, res) {
    try {
      const perigo = await Perigo.findByIdAndDelete(req.params.id);
      if (perigo) {
        const id = perigo._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Perigo não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = PerigoController;

// Restante das funções CRUD para Perigo (getPerigo, updatePerigo, deletePerigo)
