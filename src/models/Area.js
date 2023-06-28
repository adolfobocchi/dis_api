const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
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

const modelName = 'area';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[areaSchema];
} else {
  module.exports = mongoose.model(modelName, areaSchema);
}
