const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const multer = require('multer');
const usuarioController = require('../controller/UsuarioController');
const disController = require('../controller/DisController');
const areaController = require('../controller/AreaController');
const setorController = require('../controller/SetorController');
const funcaoController = require('../controller/FuncaoController');
const processoController = require('../controller/ProcessoController');
const atividadeController = require('../controller/AtividadeController');
const recursoController = require('../controller/RecursoController');
const riscoController = require('../controller/RiscoController');
const causaController = require('../controller/CausaController');
const medidaController = require('../controller/MedidaController');
const probabilidadeController = require('../controller/ProbabilidadeController');
const severidadeController = require('../controller/SeveridadeController');
const nivelriscoController = require('../controller/NivelRiscoController');
const propostaController = require('../controller/PropostaController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.env.PATH_WWW}/public/images/`)
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length-1];
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });


router.get('/ping',(req, res) => {
    return res.json({pong: true})
})

// Rota para cadastrar um novo usuário
router.post('/register',  usuarioController.register);

// Rota para fazer login
router.post('/login', usuarioController.login);

router.post('/logout', usuarioController.logout);

// Rota para criar um novo DIS
router.post('/dis', usuarioController.private, upload.fields([{ name: 'imagens', maxCount: 10 }]), disController.createDIS);

// Rota para obter todos os DISs
router.get('/dis/:page/:ativo', usuarioController.private, disController.getDISs);

// Rota para obter um DIS específico
router.get('/dis/:id', usuarioController.private, disController.getDIS);

// Rota para atualizar um DIS
router.put('/dis/:id', usuarioController.private, upload.fields([{ name: 'imagens', maxCount: 10 }]), disController.updateDIS);

// Rota para excluir um DIS
router.delete('/dis/:id', usuarioController.private, disController.deleteDIS);


router.get('/areas/:page/:ativo', areaController.listar);
router.get('/areas/:id', areaController.show);
router.post('/areas', usuarioController.private, areaController.criar);
router.put('/areas/:id', usuarioController.private, areaController.update);
router.delete('/areas/:id', usuarioController.private, areaController.delete);

router.get('/setores/:page/:ativo', setorController.listar);
router.get('/setores/:id', setorController.show);
router.post('/setores', usuarioController.private, setorController.criar);
router.put('/setores/:id', usuarioController.private, setorController.update);
router.delete('/setores/:id', usuarioController.private, setorController.delete);

router.get('/funcoes/:page/:ativo', funcaoController.listar);
router.get('/funcoes/:id', funcaoController.show);
router.post('/funcoes', usuarioController.private, funcaoController.criar);
router.put('/funcoes/:id', usuarioController.private, funcaoController.update);
router.delete('/funcoes/:id', usuarioController.private, funcaoController.delete);

router.get('/processos/:page/:ativo', processoController.listar);
router.get('/processos/:id', processoController.show);
router.post('/processos', usuarioController.private, processoController.criar);
router.put('/processos/:id', usuarioController.private, processoController.update);
router.delete('/processos/:id', usuarioController.private, processoController.delete);

router.get('/atividades/:page/:ativo', atividadeController.listar);
router.get('/atividades/:id', atividadeController.show);
router.post('/atividades', usuarioController.private, atividadeController.criar);
router.put('/atividades/:id', usuarioController.private, atividadeController.update);
router.delete('/atividades/:id', usuarioController.private, atividadeController.delete);

router.get('/recursos/:page/:ativo', recursoController.listar);
router.get('/recursos/:id', recursoController.show);
router.post('/recursos', usuarioController.private, recursoController.criar);
router.put('/recursos/:id', usuarioController.private, recursoController.update);
router.delete('/recursos/:id', usuarioController.private, recursoController.delete);

router.get('/riscos/:page/:ativo', riscoController.listar);
router.get('/riscos/:id', riscoController.show);
router.post('/riscos', usuarioController.private, riscoController.criar);
router.put('/riscos/:id', usuarioController.private, riscoController.update);
router.delete('/riscos/:id', usuarioController.private, riscoController.delete);

router.get('/causas/:page/:ativo', causaController.listar);
router.get('/causas/:id', causaController.show);
router.post('/causas', usuarioController.private, causaController.criar);
router.put('/causas/:id', usuarioController.private, causaController.update);
router.delete('/causas/:id', usuarioController.private, causaController.delete);

router.get('/medidas/:page/:ativo', medidaController.listar);
router.get('/medidas/:id', medidaController.show);
router.post('/medidas', usuarioController.private, medidaController.criar);
router.put('/medidas/:id', usuarioController.private, medidaController.update);
router.delete('/medidas/:id', usuarioController.private, medidaController.delete);

router.get('/probabilidades/:page/:ativo', probabilidadeController.listar);
router.get('/probabilidades/:id', probabilidadeController.show);
router.post('/probabilidades', usuarioController.private, probabilidadeController.criar);
router.put('/probabilidades/:id', usuarioController.private, probabilidadeController.update);
router.delete('/probabilidades/:id', usuarioController.private, probabilidadeController.delete);

router.get('/severidades/:page/:ativo', severidadeController.listar);
router.get('/severidades/:id', severidadeController.show);
router.post('/severidades', usuarioController.private, severidadeController.criar);
router.put('/severidades/:id', usuarioController.private, severidadeController.update);
router.delete('/severidades/:id', usuarioController.private, severidadeController.delete);

router.get('/nivelriscos/:page/:ativo', nivelriscoController.listar);
router.get('/nivelriscos/:id', nivelriscoController.show);
router.post('/nivelriscos', usuarioController.private, nivelriscoController.criar);
router.put('/nivelriscos/:id', usuarioController.private, nivelriscoController.update);
router.delete('/nivelriscos/:id', usuarioController.private, nivelriscoController.delete);

router.get('/propostas/:page/:ativo', propostaController.listar);
router.get('/propostas/:id', propostaController.show);
router.post('/propostas', usuarioController.private, propostaController.criar);
router.put('/propostas/:id', usuarioController.private, propostaController.update);
router.delete('/propostas/:id', usuarioController.private, propostaController.delete);

module.exports = router;
