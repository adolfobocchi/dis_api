require('dotenv').config();
const ConfiguracaoGerais = require('../models/ConfiguracaoGerais');

const ConfiguracaoGeraisController = {
  async show (req, res) {
    try {
      const configuracao = await ConfiguracaoGerais.find();
      console.log(configuracao[0]);
      if (configuracao) {
        return res.status(201).json(configuracao[0]);
      } else {
        console.log(error)
        return res.status(404).json({ message: 'Configuracao não encontrada' });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },
  
  async update(req, res) {
    try {
      const {_id, identificacao, email, smtp, smtpPassword, smtpPorta, emailTextoPadrao} = JSON.parse(req.body.configuracao);
      if (req.files && Object.keys(req.files).length > 0) {
        var logo = req.files.logoFile[0].filename;
      }
      if(!_id) {
        var configuracaoGerais = await ConfiguracaoGerais.create( {identificacao, logo, email, smtp, smtpPassword, smtpPorta, emailTextoPadrao});
      } else {
        var configuracaoGerais = await ConfiguracaoGerais.findByIdAndUpdate(_id, {identificacao, logo, email, smtp, smtpPassword, smtpPorta, emailTextoPadrao}, {new: true});
      }
      
      return res.status(201).json(configuracaoGerais);
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message });
    }
  },

  
};

module.exports = ConfiguracaoGeraisController;