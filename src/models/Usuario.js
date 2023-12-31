const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    enum: ['assistente', 'técnico', 'administrador'],
    default: 'assistente',
    required: true,
  },
  registro: {
    type: String,
    required: false,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    default: true,    
  }, 
  token:String
});

// Pré-save hook para gerar o hash da senha antes de salvar o usuário
usuarioSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    // this.nome = this.nome.charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    next(error);
  }
});

const modelName = 'usuario';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[usuarioSchema];
} else {
  module.exports = mongoose.model(modelName, usuarioSchema);
}
