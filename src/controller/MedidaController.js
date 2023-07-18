const Medida = require('../models/Medida');

const MedidaController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let medidas = null;
      if (ativo == 1 && page > 0) {
        medidas = await Medida.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else if (ativo == 0 && page > 0){
        medidas = await Medida.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      } else if( ativo == 1 && page == 0) {
        medidas = await Medida.find({ ativo: true })
      } else if(ativo == 0 && page == 0) {
        medidas = await Medida.find()
      }
      res.status(200).json(medidas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova medida
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaMedida = await Medida.create({nome, ativo });
      res.status(201).json(novaMedida);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma medida pelo ID
  async show (req, res) {
    try {
      const medida = await Medida.findById(req.params.id);
      if (medida) {
        res.status(201).json(medida);
      } else {
        res.status(404).json({ message: 'Medida não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma medida existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const medida = await Medida.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(medida);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma medida existente
  async delete(req, res) {
    try {
      const medida = await Medida.findByIdAndDelete(req.params.id);
      if (medida) {
        const id = medida._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Medida não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = MedidaController;

// Restante das funções CRUD para Medida (getMedida, updateMedida, deleteMedida)
