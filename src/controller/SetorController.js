const Setor = require('../models/Setor');

const SetorController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let setores = null;
      if (ativo == 1 ) {
        setores = await Setor.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        setores = await Setor.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(setores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova setor
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaSetor = await Setor.create({nome, ativo });
      res.status(201).json(novaSetor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma setor pelo ID
  async show (req, res) {
    try {
      const setor = await Setor.findById(req.params.id);
      if (setor) {
        res.status(201).json(setor);
      } else {
        res.status(404).json({ message: 'Setor não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma setor existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const setor = await Setor.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(setor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma setor existente
  async delete(req, res) {
    try {
      const setor = await Setor.findByIdAndDelete(req.params.id);
      if (setor) {
        const id = setor._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Setor não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = SetorController;

// Restante das funções CRUD para Setor (getSetor, updateSetor, deleteSetor)
