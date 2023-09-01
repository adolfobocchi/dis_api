const mongoose = require('mongoose');

const nivelRiscoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  probabilidadeValor: {
    type: Number,
    required: true,
    default: 0
  },
  severidadeValor: {
    type: Number,
    required: true,
    default: 0
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});

nivelRiscoSchema.pre('save', async function (next) {
  try {
    console.log(this.nome)
    this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

nivelRiscoSchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log(this._update.nome)
    this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

const modelName = 'nivelRisco';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[nivelRiscoSchema];
} else {
  module.exports = mongoose.model(modelName, nivelRiscoSchema);
}
