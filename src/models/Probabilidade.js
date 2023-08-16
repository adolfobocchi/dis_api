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

const modelName = 'probabilidade';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[probabilidadeSchema];
} else {
  module.exports = mongoose.model(modelName, probabilidadeSchema);
}
