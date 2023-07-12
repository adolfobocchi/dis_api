//const fs = require('fs');
//const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const mongodb = require('./database/Mongodb');
require('dotenv').config();

const server = express();
mongodb();

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

server.use(express.static(`${process.env.PATH_WWW}/public`));

server.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
server.use(bodyParser.json({limit: '50mb'}));

server.use('/api', routes);

server.use((req,res) => {
    res.send('Pagina nao encontrada');
});



//const privateKey = fs.readFileSync('/etc/letsencrypt/live/setcapp.com.br/privkey.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/setcapp.com.br/fullchain.pem', 'utf8');
//const credentials = { key: privateKey, cert: certificate };

//const httpsServer = https.createServer(credentials, server);
//httpsServer.listen(process.env.PORT, () => {
server.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});


module.exports = server;