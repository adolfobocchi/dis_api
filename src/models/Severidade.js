const mongoose = require('mongoose');

const severidadeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true, 
    unique: true
  },
  valor: {
    type: Number,
    required: true,
    default: 0
  },
  ativo: {
    type: Boolean,
    default: true,    
  }
});

// severidadeSchema.pre('save', async function (next) {
//   try {
//     console.log(this.nome)
//     this.nome = this.nome.trim().charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
//     next();
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

// severidadeSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     console.log(this._update.nome)
//     this._update.nome = this._update.nome.trim().charAt(0).toUpperCase() + this._update.nome.slice(1).toLowerCase();
//     next();
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

const modelName = 'severidade';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[severidadeSchema];
} else {
  module.exports = mongoose.model(modelName, severidadeSchema);
}
