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
  ambiente: String,
  observacaoAmbiente: String,
  setores: [{
    setor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'setor',
      required: false,
    },
    funcoes: [{
      funcao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'funcao',
        required: false,
      },
      funcionarios: {
        type: Number,
        default: 0,
        required: false,
      },
      atividades: [{
        atividade:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'atividade',
          required: false,
        },
        perigos: [{
          perigo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'perigo',
            required: false,
          },
          agentesRisco: [{
            agenteRisco: {},
            riscos: [{
              risco:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'risco',
                required: false,
              },
              viaAbsorcao: [],
              frequenciaExposicao: [],
              duracaoExposicao: [],
              causa:[{causa:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'causa',
                required: false,
              }}],
              medida: [{medida: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'medida',
                required: false,
              }}],
              avaliacao: [],
              probabilidade:[{probabilidade: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'probabilidade',
                required: false,
              }}] ,
              severidade:[{severidade: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'severidade',
                required: false,
              }}],
              nivelRisco:[{nivelRisco: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'nivelRisco',
                required: false,
              }}],
              planosAcao: [{
                planoAcao: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'planoAcao',
                  required: false,
                },
                intencao: [],
                prioridade: [],
                prazo: [],
                monitoramento:[{monitoramento: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'monitoramento',
                  required: false,
                }}],
                status: [],
              }]
            }]
          }]
        }]
      }]
    }]
  },]
});

const modelName = 'dis';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[DISchema];
} else {
  module.exports = mongoose.model(modelName, DISchema);
}
