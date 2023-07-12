const mongoose = require('mongoose');

const DISchema = new mongoose.Schema({
  empresa: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  fachada: String,
  responsavel: String,
  telefone: String,
  email: String,
  localizacao: String,
  usuarioLogado: String,
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'area',
    required: true,
  },
  ambiente: String,
  observacao: String,
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
      processos: [{
        processo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'processo',
          required: false,
        },
        atividades: [{
          atividade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'atividade',
            required: false,
          },
          recursos: [{
            recurso: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'recurso',
              required: false,
            },
            riscos: [{
              risco:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'risco',
                required: false,
              },
              causas: [{
                causa:  {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'causa',
                  required: false,
                },
                medidas:  [{
                  medida: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'medida',
                    required: false,
                  },
                  probabilidades: [{
                    probabilidade: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: 'probabilidade',
                      required: false,
                    },
                    severidades: [{
                      severidade: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'severidade',
                        required: false,
                      },
                      niveisRisco: [{
                        nivelRisco: {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: 'nivelRisco',
                          required: false,
                        },
                        propostas: [{
                          proposta: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'proposta',
                            required: false,
                          },
                        }]
                      }]
                    }]
                  }]
                }]

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
