require('dotenv').config();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsuarioController = {
 async register (req, res) {
  try {
    const { nome, email, password } = req.body;

    // Verificar se o usuário já está registrado com o email fornecido
    const existingUsuario = await Usuario.findOne({ email });
    if (existingUsuario) {
      return res.status(400).json({ message: 'O email fornecido já está em uso.' });
    }
    // Criar um novo usuário
    const newUsuario = await Usuario.create({ nome, email, password });

    // Gerar token de autenticação
    const token = jwt.sign({ usuarioId: newUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const usuario = await Usuario.findByIdAndUpdate(newUsuario.id, {token: token}).select('-password');
    res.status(201).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const usuario = await Usuario.findByIdAndUpdate(usuarioFind.id, {token: token}).select('-password');

    res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(200).json({ message: 'Logout realizado com Sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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