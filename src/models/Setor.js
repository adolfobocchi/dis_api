const mongoose = require('mongoose');

const setorSchema = new mongoose.Schema({
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

// setorSchema.pre('save', async function (next) {
//   try {
//     console.log(this.nome)
//     this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
//     next();
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

// setorSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     console.log(this._update.nome)
//     this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
//     next();
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

const modelName = 'setor';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[setorSchema];
} else {
  module.exports = mongoose.model(modelName, setorSchema);
}
