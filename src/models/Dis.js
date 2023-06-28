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
  fotoFachada: String,
  responsavel: String,
  telefone: String,
  email: String,
  localizacao: String,
  usuarioLogado: String,
  areas: [{
    area: {
      type: String,
      required: true
    },
    fotoArea: String,
    setores: [{
      setor: {
        type: String,
        required: true
      },
      funcoes: [{
        funcao: {
          type: String,
          required: true
        },
        processos: [{
          processo: {
            type: String,
            required: true
          },
          recursos: [{
            recurso: {
              type: String,
              required: true
            },
            riscos: [{
              risco: {
                type: String,
                required: true
              },
              causas: [{
                causa: {
                  type: String,
                  required: true
                },
                medidasControle: [{
                  medida: {
                    type: String,
                    required: true
                  },
                  probabilidades: [{
                    probabilidade: {
                      type: String,
                      required: true
                    },
                    severidades: [{
                      severidade: {
                        type: String,
                        required: true
                      },
                      niveisRisco: [{
                        nivel: {
                          type: String,
                          required: true
                        },
                        propostasControle: [{
                          proposta: {
                            type: String,
                            required: true
                          }
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
  }]
});

const modelName = 'dis';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[DISchema];
} else {
  module.exports = mongoose.model(modelName, DISchema);
}
