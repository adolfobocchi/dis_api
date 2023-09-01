const Funcao = require('../models/Funcao');

const FuncaoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      console.log(page,ativo)
      let funcoes = null;
      if (ativo == 1 && page > 0) {
        funcoes = await Funcao.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10)
          .sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        funcoes = await Funcao.find()
        .limit(10)
        .skip((page-1) * 10)
        .sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        funcoes = await Funcao.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        funcoes = await Funcao.find().sort({ nome: 1 })
      }
      res.status(200).json(funcoes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova funcao
  async criar(req, res) {
    try {
      const {nome, descricao, ativo } = req.body;
      const novaFuncao = await Funcao.create({nome, descricao, ativo });
      res.status(201).json(novaFuncao);
    } catch (error) {
      if(error.message.includes("E11000"))
        res.status(400).json({ message: 'REGISTRO JÁ EXISTE! VERIFIQUE' });
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma funcao pelo ID
  async show (req, res) {
    try {
      const funcao = await Funcao.findById(req.params.id);
      if (funcao) {
        res.status(201).json(funcao);
      } else {
        res.status(404).json({ message: 'Funcao não encontrada' });
      }
    } catch (error) {
      
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma funcao existente
  async update(req, res) {
    try {
      const {nome, descricao,  ativo} = req.body;
      console.log(req.params.id)
      const funcao = await Funcao.findOneAndUpdate({_id: req.params.id}, req.body,  { new: true });
      res.status(201).json(funcao);
    } catch (error) {
      if(error.message.includes("E11000"))
        res.status(400).json({ message: 'REGISTRO JÁ EXISTE! VERIFIQUE' });
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma funcao existente
  async delete(req, res) {
    try {
      const funcao = await Funcao.findByIdAndDelete(req.params.id);
      if (funcao) {
        const id = funcao._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Funcao não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = FuncaoController;

// Restante das funções CRUD para Funcao (getFuncao, updateFuncao, deleteFuncao)
