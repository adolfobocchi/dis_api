const Area = require('../models/Area');

const AreaController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let areas = null;
      if (ativo == 1 ) {
        areas = await Area.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        areas = await Area.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(areas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova area
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaArea = await Area.create({nome, ativo });
      res.status(201).json(novaArea);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma area pelo ID
  async show (req, res) {
    try {
      const area = await Area.findById(req.params.id);
      if (area) {
        res.status(201).json(area);
      } else {
        res.status(404).json({ message: 'Area não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma area existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const area = await Area.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(area);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma area existente
  async delete(req, res) {
    try {
      const area = await Area.findByIdAndDelete(req.params.id);
      if (area) {
        const id = area._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Area não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = AreaController;

// Restante das funções CRUD para Area (getArea, updateArea, deleteArea)
