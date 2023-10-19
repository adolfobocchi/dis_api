const mongoose = require('mongoose');
const moment = require('moment');

const areaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  ativo: {
    type: Boolean,
    default: true,    
  },
  inclusao: {
    type: String,
  },
});

areaSchema.pre('save', async function (next) {
  try {
    this.inclusao = moment().format('DD/MM/YYYY hh:mm:ss');
    next();
  } catch (error) {
    console.log('error: ', error)
    next(error);
  }
});


// areaSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     console.log(this._update.nome)
//     this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
//     next();
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

const modelName = 'area';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[areaSchema];
} else {
  module.exports = mongoose.model(modelName, areaSchema);
}
