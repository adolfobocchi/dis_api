const mongoose = require('mongoose');

const setorSchema = new mongoose.Schema({
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

const modelName = 'setor';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[setorSchema];
} else {
  module.exports = mongoose.model(modelName, setorSchema);
}
