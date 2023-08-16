const mongoose = require('mongoose');
const moment = require('moment');

const EmpresaSchema = new mongoose.Schema({
  razaoSocial: {
    type: String,
    required: false
  },
  nomeFantasia: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: false
  },
  cnae: {
    type: String,
    required: false
  },
  inclusao: {
    type: String,
  },
  endereco: {
    type: String,
    required: false
  },
  numero: {
    type: Number,
    default: 0,
    required: false
  },
  cep: {
    type: String,
    required: false
  },
  bairro: {
    type: String,
    required: false
  },
  cidade: {
    type: String,
    required: false
  },
  estado: {
    type: String,
    enum: [
      'acre', 'alagoas', 'amapa', 'amazonia', 'bahia', 'ceara', 'distrito federal', 'espirito santo', 'goias', 'maranhão',
      'mato grosso', 'mato grosso do sul', 'minas gerais', 'para', 'paraiba', 'parana', 'pernanbuco', 'piaui', 'rio de janeiro', 'rio grande do norte',
      'rio grande do sul', 'rondonia', 'roraima', 'santa catarina', 'são paulo', 'sergipe', 'tocantis',
    ],
    required: false
  },
  funcionarios: {
    type: Number,
    default: 0,
    required: false
  },
  responsavel: String,
  funcao: String,
  telefone: String,
  email: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'area',
    required: true,
  },
  observacao: String,
  ativo: {
    type: Boolean,
    default: true,    
  }
});

EmpresaSchema.pre('save', async function (next) {
  console.log('save')
  try {
    this.inclusao = moment().format('DD/MM/YYYY hh:mm:ss');
    next();
  } catch (error) {
    console.log('error: ', error)
    next(error);
  }
});

EmpresaSchema.pre('findOneAndUpdate', async function (next) {
  try {
    this._update.inclusao = moment().format('DD/MM/YYYY hh:mm:ss');
    next();
  } catch (error) {
    next(error);
  }
});

const modelName = 'empresa';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[EmpresaSchema];
} else {
  module.exports = mongoose.model(modelName, EmpresaSchema);
}
