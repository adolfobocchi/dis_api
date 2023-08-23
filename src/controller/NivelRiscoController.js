const NivelRisco = require('../models/NivelRisco');

const NivelRiscoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let nivelRiscos = null;
      if (ativo == 1 && page > 0) {
        nivelRiscos = await NivelRisco.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        nivelRiscos = await NivelRisco.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        nivelRiscos = await NivelRisco.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        nivelRiscos = await NivelRisco.find().sort({ nome: 1 })
      }
      return res.status(200).json(nivelRiscos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova nivelRisco
  async criar(req, res) {
    try {
      const {nome, probabilidadeValor, severidadeValor, ativo } = req.body;
      const novaNivelRisco = await NivelRisco.create({nome, probabilidadeValor, severidadeValor, ativo });
      return res.status(201).json(novaNivelRisco);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma nivelRisco pelo ID
  async show (req, res) {
    try {
      const nivelRisco = await NivelRisco.findById(req.params.id);
      if (nivelRisco) {
        return res.status(201).json(nivelRisco);
      } else {
        return res.status(404).json({ message: 'NivelRisco não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma nivelRisco existente
  async update(req, res) {
    try {
      const {nome, probabilidadeValor, severidadeValor, ativo} = req.body;
      const nivelRisco = await NivelRisco.findByIdAndUpdate(req.params.id, {nome, probabilidadeValor, severidadeValor, ativo},  { new: true });
      console.log(nivelRisco);
      return res.status(201).json(nivelRisco);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma nivelRisco existente
  async delete(req, res) {
    try {
      const nivelRisco = await NivelRisco.findByIdAndDelete(req.params.id);
      if (nivelRisco) {
        const id = nivelRisco._id;
        return res.status(201).json(id);
      } else {
        return res.status(404).json({ message: 'NivelRisco não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = NivelRiscoController;

// Restante das funções CRUD para NivelRisco (getNivelRisco, updateNivelRisco, deleteNivelRisco)
