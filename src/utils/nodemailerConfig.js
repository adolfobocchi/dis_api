const nodemailer = require('nodemailer');
const ConfiguracaoGerais = require('../models/ConfiguracaoGerais');

async function getConfiguracaoGerais() {
  const config = await ConfiguracaoGerais.findOne();
  return config;
}

const createTransporter = async () => {
  const config = await getConfiguracaoGerais();

  const transporter = nodemailer.createTransport({
    host: config.smtp,
    port: config.smtpPorta,
    secure: true, // Ou true se estiver usando uma conexão segura
    auth: {
      user: config.email,
      pass: config.smtpPassword,
    },
  });

  return transporter;
};

module.exports = createTransporter;
