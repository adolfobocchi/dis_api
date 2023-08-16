const mongoose = require('mongoose');

const planoAcaoSchema = new mongoose.Schema({
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

const modelName = 'planoAcao';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[planoAcaoSchema];
} else {
  module.exports = mongoose.model(modelName, planoAcaoSchema);
}
