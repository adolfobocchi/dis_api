const Monitoramento = require('../models/Monitoramento');

const MonitoramentoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let monitoramentos = null;
      if (ativo == 1 && page > 0) {
        monitoramentos = await Monitoramento.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        monitoramentos = await Monitoramento.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        monitoramentos = await Monitoramento.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        monitoramentos = await Monitoramento.find().sort({ nome: 1 })
      }
      res.status(200).json(monitoramentos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova monitoramento
  async criar(req, res) {
    try {
      const {nome, ativo } = req.body;
      const novaMonitoramento = await Monitoramento.create({nome, ativo });
      res.status(201).json(novaMonitoramento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma monitoramento pelo ID
  async show (req, res) {
    try {
      const monitoramento = await Monitoramento.findById(req.params.id);
      if (monitoramento) {
        res.status(201).json(monitoramento);
      } else {
        res.status(404).json({ message: 'Monitoramento não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma monitoramento existente
  async update(req, res) {
    try {
      const {nome, ativo} = req.body;
      const monitoramento = await Monitoramento.findByIdAndUpdate(req.params.id, {nome, ativo},  { new: true });
      res.status(201).json(monitoramento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma monitoramento existente
  async delete(req, res) {
    try {
      const monitoramento = await Monitoramento.findByIdAndDelete(req.params.id);
      if (monitoramento) {
        const id = monitoramento._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Monitoramento não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = MonitoramentoController;

// Restante das funções CRUD para Monitoramento (getMonitoramento, updateMonitoramento, deleteMonitoramento)
