const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const grupoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  empresas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empresa',
    required: false,
  }],
  token:String
});

// Pré-save hook para gerar o hash da senha antes de salvar o usuário
grupoSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.nome = this.nome.charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    next(error);
  }
});

const modelName = 'grupo';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[grupoSchema];
} else {
  module.exports = mongoose.model(modelName, grupoSchema);
}
