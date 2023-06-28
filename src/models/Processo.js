const mongoose = require('mongoose');

const processoSchema = new mongoose.Schema({
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

const modelName = 'processo';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[processoSchema];
} else {
  module.exports = mongoose.model(modelName, processoSchema);
}
