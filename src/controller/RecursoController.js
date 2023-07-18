const Recurso = require('../models/Recurso');

const RecursoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let recursos = null;
      if (ativo == 1 && page > 0) {
        recursos = await Recurso.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else if (ativo == 0 && page > 0){
        recursos = await Recurso.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      } else if( ativo == 1 && page == 0) {
        recursos = await Recurso.find({ ativo: true })
      } else if(ativo == 0 && page == 0) {
        recursos = await Recurso.find()
      }
      res.status(200).json(recursos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova recurso
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaRecurso = await Recurso.create({nome, ativo });
      res.status(201).json(novaRecurso);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma recurso pelo ID
  async show (req, res) {
    try {
      const recurso = await Recurso.findById(req.params.id);
      if (recurso) {
        res.status(201).json(recurso);
      } else {
        res.status(404).json({ message: 'Recurso não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma recurso existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const recurso = await Recurso.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(recurso);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma recurso existente
  async delete(req, res) {
    try {
      const recurso = await Recurso.findByIdAndDelete(req.params.id);
      if (recurso) {
        const id = recurso._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Recurso não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = RecursoController;

// Restante das funções CRUD para Recurso (getRecurso, updateRecurso, deleteRecurso)
