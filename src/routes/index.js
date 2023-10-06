const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const multer = require('multer');
const usuarioController = require('../controller/UsuarioController');
const disController = require('../controller/DisController');
const areaController = require('../controller/AreaController');
const setorController = require('../controller/SetorController');
const funcaoController = require('../controller/FuncaoController');
const perigoController = require('../controller/PerigoController');
const atividadeController = require('../controller/AtividadeController');
const monitoramentoController = require('../controller/MonitoramentoController');
const riscoController = require('../controller/RiscoController');
const causaController = require('../controller/CausaController');
const medidaController = require('../controller/MedidaController');
const probabilidadeController = require('../controller/ProbabilidadeController');
const severidadeController = require('../controller/SeveridadeController');
const nivelriscoController = require('../controller/NivelRiscoController');
const planoAcaoController = require('../controller/PlanoAcaoController');
const empresaController = require('../controller/EmpresaController');
const grupoController = require('../controller/GrupoController');
const videoController = require('../controller/VideoController');

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
router.post('/usuarios', usuarioController.private,  usuarioController.register);
router.get('/usuarios/:page/:ativo', usuarioController.private,  usuarioController.listar);
router.put('/usuarios/:id', usuarioController.private,  usuarioController.update);
router.put('/usuarios/:id/password', usuarioController.private,  usuarioController.updatePassword);
router.delete('/usuarios/:id', usuarioController.private,  usuarioController.delete);

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

router.get('/videos/:page/:ativo', videoController.listar);
router.get('/videos/:id', videoController.show);
router.post('/videos', usuarioController.private,  upload.fields([{ name: 'videoFile' }]), videoController.criar);
router.put('/videos/:id', usuarioController.private,  upload.fields([{ name: 'videoFile' }]), videoController.update);
router.delete('/videos/:id', usuarioController.private, videoController.delete);

router.get('/funcoes/:page/:ativo', funcaoController.listar);
router.get('/funcoes/:id', funcaoController.show);
router.post('/funcoes', usuarioController.private, funcaoController.criar);
router.put('/funcoes/:id', usuarioController.private, funcaoController.update);
router.delete('/funcoes/:id', usuarioController.private, funcaoController.delete);

router.get('/perigos/:page/:ativo', perigoController.listar);
router.get('/perigos/:id', perigoController.show);
router.post('/perigos', usuarioController.private, perigoController.criar);
router.put('/perigos/:id', usuarioController.private, perigoController.update);
router.delete('/perigos/:id', usuarioController.private, perigoController.delete);

router.get('/atividades/:page/:ativo', atividadeController.listar);
router.get('/atividades/:id', atividadeController.show);
router.post('/atividades', usuarioController.private, atividadeController.criar);
router.put('/atividades/:id', usuarioController.private, atividadeController.update);
router.delete('/atividades/:id', usuarioController.private, atividadeController.delete);

router.get('/monitoramentos/:page/:ativo', monitoramentoController.listar);
router.get('/monitoramentos/:id', monitoramentoController.show);
router.post('/monitoramentos', usuarioController.private, monitoramentoController.criar);
router.put('/monitoramentos/:id', usuarioController.private, monitoramentoController.update);
router.delete('/monitoramentos/:id', usuarioController.private, monitoramentoController.delete);

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

router.get('/planosacao/:page/:ativo', planoAcaoController.listar);
router.get('/planosacao/:id', planoAcaoController.show);
router.post('/planosacao', usuarioController.private, planoAcaoController.criar);
router.put('/planosacao/:id', usuarioController.private, planoAcaoController.update);
router.delete('/planosacao/:id', usuarioController.private, planoAcaoController.delete);

router.get('/empresas/:page/:ativo', empresaController.listar);
router.get('/empresas/:id', empresaController.show);
router.post('/empresas', usuarioController.private, empresaController.criar);
router.put('/empresas/:id', usuarioController.private, empresaController.update);
router.delete('/empresas/:id', usuarioController.private, empresaController.delete);

router.post('/empresas/comunicado/:id', usuarioController.private, empresaController.addComunicado);
router.put('/empresas/comunicado/:id', usuarioController.private, empresaController.updateComunicado);
router.delete('/empresas/:id/comunicado/:comunicadoId', usuarioController.private, empresaController.removeComunicado);

router.post('/empresas/documento/:id', usuarioController.private, upload.fields([{ name: 'documentoFile' }]), empresaController.addDocumento);
router.put('/empresas/documento/:id', usuarioController.private, upload.fields([{ name: 'documentoFile' }]), empresaController.updateDocumento);
router.delete('/empresas/:id/documento/:documentoId/:documentoNome', usuarioController.private, empresaController.removeDocumento);

router.post('/empresas/historicoacao/:id', usuarioController.private, empresaController.addHistoricoAcao);
router.put('/empresas/historicoacao/:id', usuarioController.private, empresaController.updateHistoricoAcao);
router.delete('/empresas/:id/historicoacao/:historicoAcaoId', usuarioController.private, empresaController.removeHistoricoAcao);

router.post('/empresas/planoacao/:id', usuarioController.private, upload.fields([{ name: 'documentoFile' }]), empresaController.addPlanoAcao);
router.put('/empresas/planoacao/:id', usuarioController.private, upload.fields([{ name: 'documentoFile' }]), empresaController.updatePlanoAcao);
router.delete('/empresas/:id/planoacao/:planoAcaoId/:documentoNome', usuarioController.private, empresaController.removePlanoAcao);

router.post('/empresas/solicitacao/:id', usuarioController.private, empresaController.addSolicitacao);
router.put('/empresas/solicitacao/:id', usuarioController.private, empresaController.updateSolicitacao);
router.delete('/empresas/:id/solicitacao/:solicitacaoId', usuarioController.private, empresaController.removeSolicitacao);

router.post('/empresas/:id/solicitacao/:solicitacaoId/resposta', usuarioController.private, empresaController.addRespostaSolicitacao);
router.put('/empresas/:id/solicitacao/:solicitacaoId/resposta/:respostaSolicitacaoId', usuarioController.private, empresaController.updateRespostaSolicitacao);
router.delete('/empresas/:id/solicitacao/:solicitacaoId/resposta/:respostaSolicitacaoId', usuarioController.private, empresaController.removeRespostaSolicitacao);

router.get('/grupos/:page/:ativo', grupoController.listar);
router.get('/grupos/:id', grupoController.show);
router.post('/grupos', usuarioController.private, grupoController.criar);
router.put('/grupos/:id', usuarioController.private, grupoController.update);
router.delete('/grupos/:id', usuarioController.private, grupoController.delete);

// Rota para fazer login
router.post('/areadocliente/login', grupoController.login);

router.post('/areadocliente/logout', grupoController.logout);

module.exports = router;
