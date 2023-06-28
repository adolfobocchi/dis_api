const mongoose = require('mongoose');

const recursoSchema = new mongoose.Schema({
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

const modelName = 'recurso';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[recursoSchema];
} else {
  module.exports = mongoose.model(modelName, recursoSchema);
}
