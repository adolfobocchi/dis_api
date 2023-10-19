const mongoose = require('mongoose');

const numeroAleatorio = new mongoose.Schema({
    numero: { type: Number, unique: true }
});


const modelName = 'numeroAleatorio';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[numeroAleatorio];
} else {
    module.exports = mongoose.model(modelName, numeroAleatorio);
}