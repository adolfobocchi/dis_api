require('dotenv').config();
const mongoose = require('mongoose');

const mongodb = async () => {
  await mongoose.connect(process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV, { retryWrites: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
}

module.exports = mongodb;