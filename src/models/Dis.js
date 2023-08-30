const mongoose = require('mongoose');

const DISchema = new mongoose.Schema({
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empresa',
    required: true,
  },
  data: {
    type: String,
    required: true
  },
  fachada: String,
  responsavel: String,
  funcao: String,
  telefone: String,
  email: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
  observacaoAmbiente: String,
  setores: [{setor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'setor',
    required: false,
  },
  descricao: {},
  setorImg: String,
  }],
  funcoes: [{
    funcao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'funcao',
      required: false,
    },
    quantidade: Number,
    descricao: {},
    setor: String
  }],
  atividades: [{
    atividade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'atividade',
    required: false,
    },
    setor: String,
    funcao: String,
  }],
  perigos: [{
    perigo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'perigo',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String
  }],
  riscos: [{
    risco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'risco',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
  }],
  agentesRisco: [{
    agenteRisco: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  viasAbsorcao: [{
    viaAbsorcao: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  frequenciaExposicao: [{
    frequenciaExposicao: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  duracaoExposicao: [{
    duracaoExposicao: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  causas: [{
    causa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'causa',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  medidas: [{
    medida: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'medida',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  avaliacao: [{
    avaliacao: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  probabilidades: [{
    probabilidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'probabilidade',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  severidades: [{
    severidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'severidade',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  niveisRisco: [{
    nivelRisco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'nivelRisco',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  planosAcao: [{
    planoAcao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'planoAcao',
      required: false,
    },
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String
  }],
  intencao: [{
    intencao: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String,
    planoAcao: String,
  }],
  prioridade: [{
    prioridade: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String,
    planoAcao: String,
  }],
  prazo: [{
    prazo: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String,
    planoAcao: String,
  }],
  monitoramentos: [{
    monitoramento: {type: mongoose.Schema.Types.ObjectId,
      ref: 'monitoramento',
      required: false,},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String,
    planoAcao: String,
  }],
  status: [{
    status: {},
    setor: String,
    funcao: String,
    atividade: String,
    perigo: String,
    risco: String,
    planoAcao: String,
  }]
});

const modelName = 'dis';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[DISchema];
} else {
  module.exports = mongoose.model(modelName, DISchema);
}
