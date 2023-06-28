const mongoose = require('mongoose');

const riscoSchema = new mongoose.Schema({
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

const modelName = 'risco';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[riscoSchema];
} else {
  module.exports = mongoose.model(modelName, riscoSchema);
}
