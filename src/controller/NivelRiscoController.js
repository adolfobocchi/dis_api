const NivelRisco = require('../models/NivelRisco');

const NivelRiscoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let nivelRiscos = null;
      if (ativo == 1 ) {
        nivelRiscos = await NivelRisco.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        nivelRiscos = await NivelRisco.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(nivelRiscos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova nivelRisco
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaNivelRisco = await NivelRisco.create({nome, ativo });
      res.status(201).json(novaNivelRisco);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma nivelRisco pelo ID
  async show (req, res) {
    try {
      const nivelRisco = await NivelRisco.findById(req.params.id);
      if (nivelRisco) {
        res.status(201).json(nivelRisco);
      } else {
        res.status(404).json({ message: 'NivelRisco não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma nivelRisco existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const nivelRisco = await NivelRisco.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(nivelRisco);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma nivelRisco existente
  async delete(req, res) {
    try {
      const nivelRisco = await NivelRisco.findByIdAndDelete(req.params.id);
      if (nivelRisco) {
        const id = nivelRisco._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'NivelRisco não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = NivelRiscoController;

// Restante das funções CRUD para NivelRisco (getNivelRisco, updateNivelRisco, deleteNivelRisco)
