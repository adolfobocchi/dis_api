const mongoose = require('mongoose');
const moment = require('moment');

const EmpresaSchema = new mongoose.Schema({
  razaoSocial: {
    type: String,
    required: true
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
    default: 'são paulo',
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
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'grupo',
    required: false,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: false,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: false,
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'area',
    required: false,
  },
  observacao: String,
  ativo: {
    type: Boolean,
    default: true,
  },
  tipoContrato: {
    type: String,
    required: false
  },
  inicioContrato: {
    type: String,
    required: false
  },
  vencimentoContrato: {
    type: String,
    required: false
  },
  contrato: {
    type: String,
    required: false
  },
  comunicados: [{
    descricao: {
      type: String,
      required: false
    },
    data: {
      type: String,
      required: false
    },
    aceite: {
      type: String,
      required: false
    },
    aceiteID: {
      type: String,
      required: false
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: false,
    },
  }],
  solicitacoes: [{
    codigo: {
      type: Number,
      required: false
    },
    responsavel: {
      type: String,
      required: false
    },
    abertura: {
      type: String,
      required: false
    },
    descricao: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: [
        'aberta', 'em andamento', 'encerrada'
      ],
      default: 'aberta',
      required: false
    },
    encerramento: {
      type: String,
      required: false
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: false,
    },
    respostas: [
      {
        responsavel: {
          type: String,
          required: false
        },
        data: {
          type: String,
          required: false
        },
        descricao: {
          type: String,
          required: false
        },
      }
    ]
  }],
  historicoAcao: [{
    responsavel: {
      type: String,
      required: false
    },
    data: {
      type: String,
      required: false
    },
    etapa: {
      type: String,
      required: false
    },
    descricao: {
      type: String,
      required: false
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: false,
    },
  }],
  documentos: [{
    codigo: {
      type: Number,
      required: false
    },
    data: {
      type: String,
      required: false
    },
    dataDownload: {
      type: String,
      required: false
    },
    downloadID: {
      type: String,
      required: false
    },
    descricao: {
      type: String,
      required: false
    },
    observacao: {
      type: String,
      required: false
    },
    documento: {
      type: String,
      required: false
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
  }],
  planoAcao: [{
    codigo: {
      type: Number,
      required: false
    },
    descricao: {
      type: String,
      required: false
    },
    inicio: {
      type: String,
      required: false
    },
    encerramento: {
      type: String,
      required: false
    },
    prazo: {
      type: Number,
      required: false
    },
    documento: {
      type: String,
      required: false
    },
    acao: {
      type: String,
      enum: [
        'aberta', 'em andamento', 'encerrada'
      ],
      default: 'aberta',
      required: false
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: false,
    },
  }],
});

EmpresaSchema.pre('save', async function (next) {
  try {
    this.inclusao = moment().format('DD/MM/YYYY hh:mm:ss');
    this.razaoSocial = this.razaoSocial?.trim().charAt(0).toUpperCase() + this.razaoSocial?.slice(1).toLowerCase();
    this.nomeFantasia = this.nomeFantasia?.trim().charAt(0).toUpperCase() + this.nomeFantasia?.slice(1).toLowerCase();
    this.endereco = this.endereco?.trim().charAt(0).toUpperCase() + this.endereco?.slice(1).toLowerCase();
    this.bairro = this.bairro?.trim().charAt(0).toUpperCase() + this.bairro?.slice(1).toLowerCase();
    this.cidade = this.cidade?.trim().charAt(0).toUpperCase() + this.cidade?.slice(1).toLowerCase();
    this.responsavel = this.responsavel?.trim().charAt(0).toUpperCase() + this.responsavel?.slice(1).toLowerCase();
    this.funcao = this.funcao?.trim().charAt(0).toUpperCase() + this.funcao?.slice(1).toLowerCase();
    next();
  } catch (error) {
    console.log('error: ', error)
    next(error);
  }
});



// EmpresaSchema.pre('findOneAndUpdate', async function (next) {
//   try {
    
//     this._update.razaoSocial = this._update.razaoSocial?.trim().charAt(0).toUpperCase() + this._update.razaoSocial?.slice(1).toLowerCase();
//     this._update.nomeFantasia = this._update.nomeFantasia?.trim().charAt(0).toUpperCase() + this._update.nomeFantasia?.slice(1).toLowerCase();
//     this._update.endereco = this._update.endereco?.trim().charAt(0).toUpperCase() + this._update.endereco?.slice(1).toLowerCase();
//     this._update.bairro = this._update.bairro?.trim().charAt(0).toUpperCase() + this._update.bairro?.slice(1).toLowerCase();
//     this._update.cidade = this._update.cidade?.trim().charAt(0).toUpperCase() + this._update.cidade?.slice(1).toLowerCase();
//     this._update.responsavel = this._update.responsavel?.trim().charAt(0).toUpperCase() + this._update.responsavel?.slice(1).toLowerCase();
//     this._update.funcao = this._update.funcao?.trim().charAt(0).toUpperCase() + this._update.funcao?.slice(1).toLowerCase();
    
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const modelName = 'empresa';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[EmpresaSchema];
} else {
  module.exports = mongoose.model(modelName, EmpresaSchema);
}
