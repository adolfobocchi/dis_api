const Atividade = require('../models/Atividade');

const AtividadeController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let atividades = null;
      if (ativo == 1 && page > 0) {
        atividades = await Atividade.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        atividades = await Atividade.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        atividades = await Atividade.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        atividades = await Atividade.find().sort({ nome: 1 })
      }
      res.status(200).json(atividades);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova atividade
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaAtividade = await Atividade.create({nome, ativo });
      res.status(201).json(novaAtividade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma atividade pelo ID
  async show (req, res) {
    try {
      const atividade = await Atividade.findById(req.params.id);
      if (atividade) {
        res.status(201).json(atividade);
      } else {
        res.status(404).json({ message: 'Atividade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma atividade existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const atividade = await Atividade.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(atividade);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma atividade existente
  async delete(req, res) {
    try {
      const atividade = await Atividade.findByIdAndDelete(req.params.id);
      if (atividade) {
        const id = atividade._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Atividade não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = AtividadeController;

// Restante das funções CRUD para Atividade (getAtividade, updateAtividade, deleteAtividade)
