const mongoose = require('mongoose');

const monitoramentoSchema = new mongoose.Schema({
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

const modelName = 'monitoramento';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[monitoramentoSchema];
} else {
  module.exports = mongoose.model(modelName, monitoramentoSchema);
}
