const mongoose = require('mongoose');

const propostaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});

const modelName = 'proposta';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[propostaSchema];
} else {
  module.exports = mongoose.model(modelName, propostaSchema);
}
