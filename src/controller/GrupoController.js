require('dotenv').config();
const Grupo = require('../models/Grupo');

const GrupoController = {
  async criar(req, res) {
    try {
      const novaGrupo = await Grupo.create(req.body);
      const grupo = await Grupo.findById(novaGrupo._id)
        .populate('empresas')
      res.status(201).json(grupo);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  },

  async listar(req, res) {
    try {
      const page = req.params.page;
      const ativo = req.params.ativo;
      let grupos = null;
      if (ativo == 1 && page > 0) {
        grupos = await Grupo.find({ ativo: true })
          .limit(10)
          .skip((page - 1) * 10)
          .populate('empresas').sort({ nome: 1 }).select(['-password', '-token']);

      } else if (ativo == 0 && page > 0) {
        grupos = await Grupo.find()
          .limit(10)
          .skip((page - 1) * 10)
          .populate('empresas').sort({ nome: 1 }).select(['-password', '-token']);

      } else if (ativo == 1 && page == 0) {
        grupos = await Grupo.find({ ativo: true })
          .populate('empresas').sort({ nome: 1 }).select(['-password', '-token']);

      } else if (ativo == 0 && page == 0) {
        grupos = await Grupo.find()
          .populate('empresas').sort({ nome: 1 }).select(['-password', '-token']);

      }
      return res.status(200).json(grupos);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },

  // Buscar uma grupo pelo ID
  async show(req, res) {
    try {
      const grupo = await Grupo.findById(req.params.id).populate('empresas')
      if (grupo) {
        return res.status(201).json(grupo);
      } else {
        return res.status(404).json({ message: 'Grupo não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Atualizar uma grupo existente
  async update(req, res) {
    try {
      const grupo = await Grupo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .populate('empresas')
      return res.status(201).json(grupo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Deletar uma grupo existente
  async delete(req, res) {
    try {
      const grupo = await Grupo.findByIdAndDelete(req.params.id);
      if (grupo) {
        const id = grupo._id;
        return res.status(201).json(id);
      } else {
        return res.status(404).json({ message: 'Grupo não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = GrupoController;