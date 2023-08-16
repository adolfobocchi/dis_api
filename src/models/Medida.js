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

const modelName = 'medida';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[medidaSchema];
} else {
  module.exports = mongoose.model(modelName, medidaSchema);
}
