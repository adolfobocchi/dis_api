const mongoose = require('mongoose');

const perigoSchema = new mongoose.Schema({
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

const modelName = 'perigo';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[perigoSchema];
} else {
  module.exports = mongoose.model(modelName, perigoSchema);
}
