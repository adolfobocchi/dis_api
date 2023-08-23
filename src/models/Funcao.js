const mongoose = require('mongoose');

const funcaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao:{
    type: String,
    required: false,
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});

const modelName = 'funcao';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[funcaoSchema];
} else {
  module.exports = mongoose.model(modelName, funcaoSchema);
}
