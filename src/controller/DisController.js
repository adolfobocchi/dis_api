const DIS = require('../models/Dis');

// Função para criar um novo DIS
exports.createDIS = async (req, res) => {
  try {
    const { 
      empresa,
      data,
      responsavel,
      funcao,
      telefone,
      email,
      usuario,
      ambiente,
      observacaoAmbiente,
      setores,
      funcoes,
      atividades,
      perigos,
      riscos,
      agentesRisco,
      viasAbsorcao,
      frequenciaExposicao,
      duracaoExposicao,
      causas,
      medidas,
      avaliacao,
      probabilidades,
      severidades,
      niveisRisco,
      planosAcao,
      intencao,
      prioridade,
      prazo,
      monitoramentos,
      status

    } = JSON.parse(req.body.dis);
    if (req.files && Object.keys(req.files).length > 0) {
      var fachada = req.files.imagens[0].filename;
    }
    const newDis = await DIS.create({
      empresa,
      data,
      fachada,
      responsavel,
      funcao,
      telefone,
      email,
      usuario,
      ambiente,
      observacaoAmbiente,
      setores,
      funcoes,
      atividades,
      perigos,
      riscos,
      agentesRisco,
      viasAbsorcao,
      frequenciaExposicao,
      duracaoExposicao,
      causas,
      medidas,
      avaliacao,
      probabilidades,
      severidades,
      niveisRisco,
      planosAcao,
      intencao,
      prioridade,
      prazo,
      monitoramentos,
      status
    })
    const dis = await DIS.findById(newDis._id)
    .populate({path: 'empresa', populate: {path: 'area', model: 'area'}})
    .populate('usuario')  
    .populate('setores')
    .populate('funcoes.funcao')
    .populate('atividades.atividade')
    .populate('perigos.perigo')
    .populate('riscos.risco')
    .populate('causas.causa')
    .populate('medidas.medida')
    .populate('probabilidades.probabilidade')
    .populate('severidades.severidade')
    .populate('niveisRisco.nivelRisco')
    .populate('planosAcao.planoAcao')
    .populate('monitoramentos.monitoramento')
    res.status(201).json(dis);
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
    .populate({path: 'empresa', populate: {path: 'area', model: 'area'}})
    .populate('usuario')  
    .populate('setores')
    .populate('funcoes.funcao')
    .populate('atividades.atividade')
    .populate('perigos.perigo')
    .populate('riscos.risco')
    .populate('causas.causa')
    .populate('medidas.medida')
    .populate('probabilidades.probabilidade')
    .populate('severidades.severidade')
    .populate('niveisRisco.nivelRisco')
    .populate('planosAcao.planoAcao')
    .populate('monitoramentos.monitoramento')
      .limit(10)
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
    const dis = await DIS.findById(req.params.id).populate({path: 'empresa', populate: {path: 'area', model: 'area'}})
    .populate('usuario')  
    .populate('setores')
    .populate('funcoes.funcao')
    .populate('atividades.atividade')
    .populate('perigos.perigo')
    .populate('riscos.risco')
    .populate('causas.causa')
    .populate('medidas.medida')
    .populate('probabilidades.probabilidade')
    .populate('severidades.severidade')
    .populate('niveisRisco.nivelRisco')
    .populate('planosAcao.planoAcao')
    .populate('monitoramentos.monitoramento');
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
    const { 
      empresa,
      data,
      responsavel,
      funcao,
      telefone,
      email,
      usuario,
      ambiente,
      observacaoAmbiente,
      setores,
      funcoes,
      atividades,
      perigos,
      riscos,
      agentesRisco,
      viasAbsorcao,
      frequenciaExposicao,
      duracaoExposicao,
      causas,
      medidas,
      avaliacao,
      probabilidades,
      severidades,
      niveisRisco,
      planosAcao,
      intencao,
      prioridade,
      prazo,
      monitoramentos,
      status
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
      funcao,
      telefone,
      email,
      usuario,
      ambiente,
      observacaoAmbiente,
      setores,
      funcoes,
      atividades,
      perigos,
      riscos,
      agentesRisco,
      viasAbsorcao,
      frequenciaExposicao,
      duracaoExposicao,
      causas,
      medidas,
      avaliacao,
      probabilidades,
      severidades,
      niveisRisco,
      planosAcao,
      intencao,
      prioridade,
      prazo,
      monitoramentos,
      status
    }, { new: true })
      .populate({path: 'empresa', populate: {path: 'area', model: 'area'}})
      .populate('usuario') 
      .populate('setores') 
    .populate('funcoes.funcao')
    .populate('atividades.atividade')
    .populate('perigos.perigo')
    .populate('riscos.risco')
    .populate('causas.causa')
    .populate('medidas.medida')
    .populate('probabilidades.probabilidade')
    .populate('severidades.severidade')
    .populate('niveisRisco.nivelRisco')
    .populate('planosAcao.planoAcao')
    .populate('monitoramentos.monitoramento')
    if (!dis) {
      return res.status(404).json({ message: 'DIS não encontrado' });
    }
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
