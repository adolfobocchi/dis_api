const ConfiguracaoGerais = require('../models/ConfiguracaoGerais');
const Logs = require('../models/Logs');
const createTransporter = require('./nodemailerConfig');
const moment = require('moment');
async function getConfiguracaoGerais() {
    const config = await ConfiguracaoGerais.findOne();
    return config;
  }
const SendEmailController = {
    async sendEmail(to, assunto, texto) {
        const transporter = await createTransporter();
        const config = await getConfiguracaoGerais();
        const novaMensagem = config.emailTextoPadrao.replace("{texto}", texto);
        try {
            transporter.sendMail({
                from: config.email,
                to: to,
                subject: assunto,
                html: `${novaMensagem}`,

            }, (error, info) => {
                const data = moment().format('DD/MM/YYYY hh:mm:ss')
                if (error) {
                    
                    console.error('Erro ao enviar o email: ' + error);
                    Logs.create({texto: `Data: ${data} - Erro ao enviar o email para ${to}: ${error}`})
                } else {
                    console.log('Email enviado com sucesso: ' + info.response);
                    Logs.create({texto: `Data: ${data} - Email enviado com sucesso para ${to}: ${info.response}`})
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = SendEmailController;