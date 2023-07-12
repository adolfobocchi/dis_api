const moment = require('moment');
const DIS = require('../models/Dis');

// Função para criar um novo DIS
exports.createDIS = async (req, res) => {
  try {
    const { 
      empresa,
      data,
      responsavel,
      telefone,
      email,
      localizacao,
      area,
      ambiente,
      observacao,
      setores
    } = JSON.parse(req.body.dis);
    if (req.files && Object.keys(req.files).length > 0) {
      var fachada = req.files.imagens[0].filename;
    }
    const newDis = await DIS.create({
      empresa,
      data,
      fachada,
      responsavel,
      telefone,
      email,
      localizacao,
      area,
      ambiente,
      observacao,
      setores})
      .populate('area')
      .populate('setores.setor')
      .populate('setores.funcoes.funcao')
      .populate('setores.funcoes.processos.processo')
      .populate('setores.funcoes.processos.atividades.atividade')
      .populate('setores.funcoes.processos.atividades.recursos.recurso')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.risco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.causa')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.medida')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.probabilidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.severidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.nivelRisco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.propostas.proposta')
    res.status(201).json(newDis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Função para obter todos os DISs
exports.getDISs = async (req, res) => {
  try {
    const {page, ativo} = req.params;
    let dis = await DIS.find()
      .populate('area')
      .populate('setores.setor')
      .populate('setores.funcoes.funcao')
      .populate('setores.funcoes.processos.processo')
      .populate('setores.funcoes.processos.atividades.atividade')
      .populate('setores.funcoes.processos.atividades.recursos.recurso')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.risco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.causa')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.medida')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.probabilidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.severidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.nivelRisco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.propostas.proposta')
      .limit(page * 10)
      .skip((page-1) * 10);
    
    res.status(200).json(dis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Função para obter um DIS específico
exports.getDIS = async (req, res) => {
  try {
    const dis = await DIS.findById(req.params.id);
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    res.json(dis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para atualizar um DIS
exports.updateDIS = async (req, res) => {
  try {
    console.log(req.body.dis);
    const { 
      empresa,
      data,
      responsavel,
      telefone,
      email,
      localizacao,
      area,
      ambiente,
      observacao,
      setores
    } = JSON.parse(req.body.dis);
    if (req.files && Object.keys(req.files).length > 0) {
      console.log(req.files);
      var fachada = req.files.imagens[0].filename;
    }
    const dis = await DIS.findOneAndUpdate({_id: req.params.id}, {
      empresa,
      data,
      fachada,
      responsavel,
      telefone,
      email,
      localizacao,
      area,
      ambiente,
      observacao,
      setores}, { new: true })
      .populate('area')
      .populate('setores.setor')
      .populate('setores.funcoes.funcao')
      .populate('setores.funcoes.processos.processo')
      .populate('setores.funcoes.processos.atividades.atividade')
      .populate('setores.funcoes.processos.atividades.recursos.recurso')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.risco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.causa')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.medida')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.probabilidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.severidade')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.nivelRisco')
      .populate('setores.funcoes.processos.atividades.recursos.riscos.causas.medidas.probabilidades.severidades.niveisRisco.propostas.proposta')
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    console.log(dis);
    res.json(dis);
  } catch (error) {

    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Função para excluir um DIS
exports.deleteDIS = async (req, res) => {
  try {
    const dis = await DIS.findByIdAndDelete(req.params.id);
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
    res.json({ message: 'DIS excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
