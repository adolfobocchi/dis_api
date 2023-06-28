const mongoose = require('mongoose');

const severidadeSchema = new mongoose.Schema({
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

const modelName = 'severidade';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[severidadeSchema];
} else {
  module.exports = mongoose.model(modelName, severidadeSchema);
}
