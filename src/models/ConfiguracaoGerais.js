const mongoose = require('mongoose');

const configuracaoGeraisSchema = new mongoose.Schema({
  identificacao: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  smtp: {
    type: String,
  },
  smtpPassword: {
    type: String,
  },
  smtpPorta: {
    type: String,    
  },
  emailTextoPadrao: {
    type: String
  }
});


const modelName = 'configuracaoGerais';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[configuracaoGeraisSchema];
} else {
  module.exports = mongoose.model(modelName, configuracaoGeraisSchema);
}
