const mongoose = require('mongoose');

const atividadeSchema = new mongoose.Schema({
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

const modelName = 'atividade';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[atividadeSchema];
} else {
  module.exports = mongoose.model(modelName, atividadeSchema);
}
