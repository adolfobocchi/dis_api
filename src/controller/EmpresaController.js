require('dotenv').config();
const Empresa = require('../models/Empresa');

const EmpresaController = {
  async criar(req, res) {
    try {
      console.log(req.body);
      const novaEmpresa = await Empresa.create(req.body);
      const empresa = await Empresa.findById(novaEmpresa._id)
      .populate('area')
      .populate('usuario')
      .populate('tecnico')
      res.status(201).json(empresa);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  },

  async listar(req, res) {
    try {
      const page = req.params.page;
      const ativo = req.params.ativo;
      let empresas = null;
      if (ativo == 1 && page > 0) {
        empresas = await Empresa.find({ ativo: true })
          .limit(page * 10)
          .skip((page - 1) * 10)
          .populate('area')
          .populate('usuario')
          .populate('tecnico')
      } else if (ativo == 0 && page > 0) {
        empresas = await Empresa.find()
          .limit(page * 10)
          .skip((page - 1) * 10)
          .populate('area')
          .populate('usuario')
          .populate('tecnico')
      } else if (ativo == 1 && page == 0) {
        empresas = await Empresa.find({ ativo: true })
        .populate('area')
        .populate('usuario')
        .populate('tecnico')
      } else if (ativo == 0 && page == 0) {
        empresas = await Empresa.find()
        .populate('area')
        .populate('usuario')
        .populate('tecnico')
      }
      return res.status(200).json(empresas);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },

  // Buscar uma empresa pelo ID
  async show(req, res) {
    try {
      const empresa = await Empresa.findById(req.params.id).populate('area')
      .populate('usuario')
      .populate('tecnico');
      if (empresa) {
        return res.status(201).json(empresa);
      } else {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Atualizar uma empresa existente
  async update(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
      .populate('area')
      .populate('usuario')
      .populate('tecnico')
      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  // Deletar uma empresa existente
  async delete(req, res) {
    try {
      const empresa = await Empresa.findByIdAndDelete(req.params.id);
      if (empresa) {
        const id = empresa._id;
        return res.status(201).json(id);
      } else {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = EmpresaController;