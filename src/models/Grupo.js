const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const moment = require('moment');

const grupoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: false
  },
  password: {
    type: String,
    required: false
  },
  responsavel: {
    type: String,
    required: false,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: false,
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
  inclusao: {
    type: String,
  },
  token:String
});

// Pré-save hook para gerar o hash da senha antes de salvar o usuário
grupoSchema.pre('save', async function (next) {
  try {
    if(this.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      // this.nome = this.nome.charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    }
    this.inclusao = moment().format('DD/MM/YYYY hh:mm:ss');
    next();
  } catch (error) {
    next(error);
  }
});

grupoSchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log(this._update.password);
    if(this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashedPassword;
      this._update.nome = this._update.nome.charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
      next();
    }
  } catch (error) {
    next(error);
  }
});
  //   try {

const modelName = 'grupo';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[grupoSchema];
} else {
  module.exports = mongoose.model(modelName, grupoSchema);
}
