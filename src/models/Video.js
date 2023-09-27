const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: false,
  },
  data: {
    type: String,
    required: false,
  },
  ativo: {
    type: Boolean,
    default: true,    
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: false,
  },
});

const modelName = 'video';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[videoSchema];
} else {
  module.exports = mongoose.model(modelName, videoSchema);
}
