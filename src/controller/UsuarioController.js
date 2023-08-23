require('dotenv').config();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsuarioController = {
  async register (req, res) {
  try {
    const { nome, email, tipo, registro, password, ativo } = req.body;

    // Verificar se o usuário já está registrado com o email fornecido
    const existingUsuario = await Usuario.findOne({ email });
    if (existingUsuario) {
      return res.status(400).json({ message: 'O email fornecido já está em uso.' });
    }
    // Criar um novo usuário
    const newUsuario = await Usuario.create({ nome, email, tipo, registro, password, ativo });

    // Gerar token de autenticação
    const token = jwt.sign({ usuarioId: newUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const usuario = await Usuario.findByIdAndUpdate(newUsuario.id, {token: token}).select('-password');
    return res.status(201).json({ usuario, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário existe
      const usuarioFind = await Usuario.findOne({ email });
      if (!usuarioFind) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(password, usuarioFind.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Gerar token de autenticação
      const token = jwt.sign({ usuarioId: usuarioFind._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const usuario = await Usuario.findByIdAndUpdate(usuarioFind.id, {token: token}).select(['-password', '-token']);

      return res.status(200).json({ usuario, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async logout (req, res) {
    try {
      const { id } = req.body;
      // Verificar se o usuário existe
      const usuario = await Usuario.findByIdAndUpdate({_id: id}, { token: '' });
      
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
      return res.status(200).json({ message: 'Logout realizado com Sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async listar (req, res) {
    try {
      const page = req.params.page;
      const ativo = req.params.ativo;
      let usuarios = null;
      if (ativo == 1 && page > 0) {
        usuarios = await Usuario.find({ ativo: true }).select(['-password', '-token'])
          .limit(10)
          .skip((page-1) * 10)
      } else if (ativo == 0 && page > 0){
        usuarios = await Usuario.find().select(['-password', '-token'])
        .limit(10)
        .skip((page-1) * 10)
      } else if( ativo == 1 && page == 0) {
        usuarios = await Usuario.find({ ativo: true }).select(['-password', '-token'])
      } else if(ativo == 0 && page == 0) {
        usuarios = await Usuario.find().select(['-password', '-token'])
      }
      console.log(usuarios);
      return res.status(200).json(usuarios);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },

  // Buscar uma usuario pelo ID
  async show (req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id).select(['-password', '-token']);
      if (usuario) {
        return res.status(201).json(usuario);
      } else {
        return res.status(404).json({ message: 'Usuario não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma usuario existente
  async update(req, res) {
    try {
      const {nome, email, tipo, registro, ativo} = req.body;
      console.log(registro)
      const usuario = await Usuario.findByIdAndUpdate(req.params.id, {nome, email, tipo, registro, ativo},  { new: true });
      console.log(usuario);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updatePassword(req, res) {
    try {
      const {password} = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const usuario = await Usuario.findByIdAndUpdate(req.params.id, {password: hashedPassword},  { new: true });
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma usuario existente
  async delete(req, res) {
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);
      if (usuario) {
        const id = usuario._id;
        return res.status(201).json(id);
      } else {
        return res.status(404).json({ message: 'Usuario não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async private (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token JWT ausente.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: 'Token JWT inválido.' });
    }
  },
};

module.exports = UsuarioController;