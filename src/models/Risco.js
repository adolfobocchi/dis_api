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

const modelName = 'risco';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[riscoSchema];
} else {
  module.exports = mongoose.model(modelName, riscoSchema);
}
