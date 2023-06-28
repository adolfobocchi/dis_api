const Processo = require('../models/Processo');

const ProcessoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let processos = null;
      if (ativo == 1 ) {
        processos = await Processo.find({ ativo: true })
          .limit(page * 10)
          .skip((page-1) * 10)
      } else {
        processos = await Processo.find()
        .limit(page * 10)
        .skip((page-1) * 10)
      }
      res.status(200).json(processos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova processo
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaProcesso = await Processo.create({nome, ativo });
      res.status(201).json(novaProcesso);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma processo pelo ID
  async show (req, res) {
    try {
      const processo = await Processo.findById(req.params.id);
      if (processo) {
        res.status(201).json(processo);
      } else {
        res.status(404).json({ message: 'Processo não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma processo existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const processo = await Processo.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(processo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma processo existente
  async delete(req, res) {
    try {
      const processo = await Processo.findByIdAndDelete(req.params.id);
      if (processo) {
        const id = processo._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Processo não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = ProcessoController;

// Restante das funções CRUD para Processo (getProcesso, updateProcesso, deleteProcesso)
