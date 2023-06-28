const mongoose = require('mongoose');

const causaSchema = new mongoose.Schema({
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

const modelName = 'causa';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[causaSchema];
} else {
  module.exports = mongoose.model(modelName, causaSchema);
}
