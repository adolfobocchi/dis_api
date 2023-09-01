const mongoose = require('mongoose');

const medidaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  risco: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'risco',
    required: false,
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});
medidaSchema.pre('save', async function (next) {
  try {
    console.log(this.nome)
    this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

medidaSchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log(this._update.nome)
    this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

const modelName = 'medida';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[medidaSchema];
} else {
  module.exports = mongoose.model(modelName, medidaSchema);
}
