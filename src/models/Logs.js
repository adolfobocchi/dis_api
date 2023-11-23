const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  texto: {
    type: String,
  },
});
// });

const modelName = 'log';

if(mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[logSchema];
} else {
  module.exports = mongoose.model(modelName, logSchema);
}
