const moment = require('moment');
const DIS = require('../models/Dis');

// Função para criar um novo DIS
exports.createDIS = async (req, res) => {
  try {
    const newDIS = new DIS(req.body);
    await newDIS.save();
    res.status(201).json(newDIS);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para obter todos os DISs
exports.getDISs = async (req, res) => {
  try {
    const disList = await DIS.find();
    res.json(disList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para obter um DIS específico
exports.getDIS = async (req, res) => {
  try {
    const dis = await DIS.findById(req.params.id);
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    res.json(dis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para atualizar um DIS
exports.updateDIS = async (req, res) => {
  try {
    const dis = await DIS.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    res.json(dis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para excluir um DIS
exports.deleteDIS = async (req, res) => {
  try {
    const dis = await DIS.findByIdAndDelete(req.params.id);
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    res.json({ message: 'DIS excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
