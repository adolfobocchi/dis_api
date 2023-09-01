const mongoose = require('mongoose');

const probabilidadeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  valor: {
    type: Number,
    required: true,
    default: 0
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});

probabilidadeSchema.pre('save', async function (next) {
  try {
    console.log(this.nome)
    this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

probabilidadeSchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log(this._update.nome)
    this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

const modelName = 'probabilidade';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[probabilidadeSchema];
} else {
  module.exports = mongoose.model(modelName, probabilidadeSchema);
}
