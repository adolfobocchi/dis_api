const mongoose = require('mongoose');

const riscoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  viasAbsorcao: [],
  agentesRisco: [],
  causas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'causa',
    required: false,
  }],
  planosAcao: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'planoAcao',
    required: false,
  }],
  ativo: {
    type: Boolean,
    default: true,    
  }
});

riscoSchema.pre('save', async function (next) {
  try {
    console.log(this.nome)
    this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

riscoSchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log(this._update.nome)
    this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});
const modelName = 'risco';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[riscoSchema];
} else {
  module.exports = mongoose.model(modelName, riscoSchema);
}
