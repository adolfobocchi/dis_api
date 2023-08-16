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

const modelName = 'nivelRisco';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[nivelRiscoSchema];
} else {
  module.exports = mongoose.model(modelName, nivelRiscoSchema);
}
