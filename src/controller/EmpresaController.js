require('dotenv').config();
const fs = require('fs');
const Empresa = require('../models/Empresa');
const Grupo = require('../models/Grupo');
const NumeroAleatorio = require('../models/NumeroAleatorio');
const Area = require('../models/Area');

function gerarNumeroAleatorio() {
  return Math.floor(1000000 + Math.random() * 9000000);
}

async function criarNumeroAleatorioUnico() {
  let numeroAleatorio;
  let numeroExistente;

  do {
    numeroAleatorio = gerarNumeroAleatorio();
    numeroExistente = await NumeroAleatorio.findOne({ numero: numeroAleatorio });
  } while (numeroExistente);

  const novoNumeroAleatorio = new NumeroAleatorio({ numero: numeroAleatorio });
  await novoNumeroAleatorio.save();

  return numeroAleatorio;
}

function deleteImage(imageName) {
  let imagePath = `${process.env.PATH_WWW}/public/images/${imageName}`;
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    console.log('Arquivo excluído com sucesso');
    return true;
  });
}

const EmpresaController = {
  async importacao(req, res) {
    try {
      // await Empresa.deleteMany({inclusao: /18\/10/});
      // await Grupo.deleteMany({inclusao: /18\/10/});
      // // await Grupo.deleteMany({ empresas: { $size: 0 } });
      // res.status(201).json();
      
      let grupoExist = null;
      let areaExist = null;
      const { grupo, razaoSocial, nomeFantasia, cnpj, cnae, area, endereco, numero, bairro, cep, estado, cidade} = req.body;
      const grupoFind = await Grupo.findOne({nome: grupo});
      console.log('Valor de grupo:', grupo);
      console.log('Resultado da consulta:', grupoFind);
      // res.status(201).json();
      if(!grupoFind) {
        grupoExist = await Grupo.create({nome: grupo})
      } else {
        grupoExist = grupoFind
      }
      const areaFind = await Area.findOne({nome: area});
      
      if(!areaFind) {
        areaExist = await Area.create({nome: area})
      } else {
        areaExist = areaFind;
      }
      const novaEmpresa = await Empresa.create({
         grupo: grupoExist,
         area: areaExist,
         razaoSocial,
         nomeFantasia,
         cnpj,
         cnae,
         endereco,
         numero,
         bairro,
         cep,
         estado,
         cidade
      });
      const grupoUpdate = await Grupo.findById(novaEmpresa.grupo._id).select(['-password', '-token']);;
      if (grupoUpdate) {
        if (!grupoUpdate.empresas.includes(novaEmpresa._id)) {
          grupoUpdate.empresas.push(novaEmpresa._id)
          await Grupo.findOneAndUpdate({ _id: grupoUpdate._id }, grupoUpdate, { new: true })
        }
      }
      res.status(201).json(novaEmpresa);
    } catch (error) {
      console.log('Error: ' + error)
      res.status(400).json({ message: error });
    }
  },
  async criar(req, res) {
    try {
      const novaEmpresa = await Empresa.create(req.body);
      const empresa = await Empresa.findById(novaEmpresa._id)
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      const grupo = await Grupo.findById(empresa.grupo).sort({ nome: 1 }).select(['-password', '-token']);;
      if (grupo) {
        if (!grupo.empresas.includes(empresa._id)) {
          grupo.empresas.push(empresa._id)
          await Grupo.findOneAndUpdate({ _id: grupo._id }, grupo, { new: true })
        }
      }
      res.status(201).json(empresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async listar(req, res) {
    try {
      const page = req.params.page;
      const ativo = req.params.ativo;
      let empresas = null;
      if (ativo == 1 && page > 0) {
        empresas = await Empresa.find({ ativo: true })
          .limit(10)
          .skip((page - 1) * 10)
          .populate('area')
          .populate('usuario')
          .populate('grupo')
          .populate('grupo.empresas')
          .populate('tecnico').sort({ nome: 1 })

      } else if (ativo == 0 && page > 0) {
        empresas = await Empresa.find()
          .limit(10)
          .skip((page - 1) * 10)
          .populate('area')
          .populate('usuario')
          .populate('grupo')
          .populate('grupo.empresas')
          .populate('tecnico').sort({ nome: 1 })

      } else if (ativo == 1 && page == 0) {
        empresas = await Empresa.find({ ativo: true })
          .populate('area')
          .populate('usuario')
          .populate('grupo')
          .populate('grupo.empresas')
          .populate('tecnico').sort({ nome: 1 })

      } else if (ativo == 0 && page == 0) {
        empresas = await Empresa.find()
          .populate('area')
          .populate('usuario')
          .populate('grupo')
          .populate('grupo.empresas')
          .populate('tecnico').sort({ nome: 1 })

      }
      return res.status(200).json(empresas);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },


  // Buscar uma empresa pelo ID
  async show(req, res) {
    try {
      const empresa = await Empresa.findById(req.params.id).populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('tecnico');

      if (empresa) {
        return res.status(201).json(empresa);
      } else {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Atualizar uma empresa existente
  async update(req, res) {
    try {
      const empresaSearch = await Empresa.findById({ _id: req.params.id });

      const empresa = await Empresa.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')
      
      if(empresaSearch.grupo !== empresa.grupo) {
        var grupoSearch = await Grupo.findById(empresaSearch.grupo).sort({ nome: 1 }).select(['-password', '-token']);;
        if (grupoSearch) {
          grupoSearch.empresas.pull(empresa._id)
          await Grupo.findOneAndUpdate({ _id: grupoSearch._id }, grupoSearch, { new: true })
        }
        var grupoSearch = await Grupo.findById(empresa.grupo).sort({ nome: 1 }).select(['-password', '-token']);;
        if (!grupoSearch.empresas.includes(empresa._id)) {
          grupoSearch.empresas.push(empresa._id)
          await Grupo.findOneAndUpdate({ _id: grupoSearch._id }, grupoSearch, { new: true })
        }
      }
    
      
      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async addDocumento(req, res) {
    try {
      const { codigo, data, descricao, validade, observacao, ativo } = JSON.parse(req.body.documento);
      if (req.files && Object.keys(req.files).length > 0) {
        var documento = req.files.documentoFile[0].filename;
      }

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            documentos: {
              codigo,
              data,
              descricao,
              observacao,
              validade,
              documento, // Use o nome do arquivo salvo pelo Multer
              ativo,
            },
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updateDocumento(req, res) {
    try {
      const { _id, codigo, data, dataDownload, descricao, validade, observacao, ativo } = JSON.parse(req.body.documento);
      if (req.files && Object.keys(req.files).length > 0) {
        var documento = req.files.documentoFile[0].filename;
      }
      console.log(observacao);

      const empresaId = req.params.id; // Substitua pelo ID da sua empresa

      const empresa = await Empresa.findOneAndUpdate(
        {
          _id: empresaId,
          'documentos._id': _id // Filtre pelo ID do documento que você deseja atualizar
        },
        {
          $set: {
            'documentos.$.codigo': codigo,
            'documentos.$.data': data,
            'documentos.$.dataDownload': dataDownload,
            'documentos.$.descricao': descricao,
            'documentos.$.validade': validade,
            'documentos.$.observacao': observacao,
            'documentos.$.documento': documento, // Use o nome do arquivo salvo pelo Multer
            'documentos.$.ativo': ativo,
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removeDocumento(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { documentos: { _id: req.params.documentoId } }
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      if (!empresa)
        return res.status(400).json({ message: 'erro ao remover documento' });
      deleteImage(req.params.documentoNome)
      // if(!deleteImage(req.params.documentoNome)  )
      // return res.status(400).json({ message: 'erro ao remover arquivo documento' });  
      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async addPlanoAcao(req, res) {
    try {
      const { codigo, inicio, descricao, encerramento, prazo, acao, usuario } = JSON.parse(req.body.planoAcao);
      if (req.files && Object.keys(req.files).length > 0) {
        var documento = req.files.documentoFile[0].filename;
      }

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            planoAcao: {
              codigo,
              inicio,
              descricao,
              encerramento,
              prazo,
              documento,
              acao,
              usuario,
            },
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updatePlanoAcao(req, res) {
    try {
      const { _id, codigo, inicio, descricao, encerramento, prazo, acao, usuario } = JSON.parse(req.body.planoAcao);
      if (req.files && Object.keys(req.files).length > 0) {
        var documento = req.files.documentoFile[0].filename;
      }

      const empresaId = req.params.id; // Substitua pelo ID da sua empresa

      const empresa = await Empresa.findOneAndUpdate(
        {
          _id: empresaId,
          'planoAcao._id': _id // Filtre pelo ID do documento que você deseja atualizar
        },
        {
          $set: {
            'planoAcao.$.codigo': codigo,
            'planoAcao.$.inicio': inicio,
            'planoAcao.$.descricao': descricao,
            'planoAcao.$.encerramento': encerramento,
            'planoAcao.$.prazo': prazo,
            'planoAcao.$.acao': acao,
            'planoAcao.$.documento': documento, // Use o nome do arquivo salvo pelo Multer
            'planoAcao.$.usuario': usuario,
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removePlanoAcao(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { planoAcao: { _id: req.params.planoAcaoId } }
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async addSolicitacao(req, res) {
    try {
      let codigo = 0;
      const { responsavel, abertura, descricao, status, encerramento, usuario, respostas } = req.body
      await criarNumeroAleatorioUnico()
        .then(numero => {
          console.log(`Número aleatório único: ${numero}`);
          codigo = numero;
        })
        .catch(error => {
          console.error(error);
          return res.status(400).json({ message: error });
        });

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            solicitacoes: {
              codigo,
              responsavel,
              abertura,
              descricao,
              status,
              encerramento,
              respostas,
              usuario,
            },
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updateSolicitacao(req, res) {
    try {
      let novoCodigo = 0;
      const { _id, codigo, responsavel, abertura, descricao, status, encerramento, usuario, respostas } = req.body;
      if(codigo === 0 || codigo === null) {
        await criarNumeroAleatorioUnico()
        .then(numero => {
          novoCodigo = numero;
        })
        .catch(error => {
          console.error(error);
          return res.status(400).json({ message: error });
        });
      } else {
        novoCodigo = codigo;
      }
      const empresaId = req.params.id; // Substitua pelo ID da sua empresa

      const empresa = await Empresa.findOneAndUpdate(
        {
          _id: empresaId,
          'solicitacoes._id': _id // Filtre pelo ID do documento que você deseja atualizar
        },
        {
          $set: {
            'solicitacoes.$.codigo': novoCodigo,
            'solicitacoes.$.responsavel': responsavel,
            'solicitacoes.$.abertura': abertura,
            'solicitacoes.$.encerramento': encerramento,
            'solicitacoes.$.descricao': descricao,
            'solicitacoes.$.status': status,
            'solicitacoes.$.respostas': respostas, // Use o nome do arquivo salvo pelo Multer
            'solicitacoes.$.usuario': usuario,
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removeSolicitacao(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { solicitacoes: { _id: req.params.solicitacaoId } }
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async addRespostaSolicitacao(req, res) {
    try {
      const { data, descricao, usuario } = req.body
      
     
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id, 'solicitacoes._id': req.params.solicitacaoId  },
        {
          $push: {
            'solicitacoes.$.respostas': {
              data,
              descricao,
              usuario,
            },
          },
        },
        {new: true}
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updateRespostaSolicitacao(req, res) {
    try {
      console.log(req.params.id)
      console.log(req.params.solicitacaoId)
      console.log(req.params.respostaSolicitacaoId)
      console.log(req.body)

      const { data, descricao, usuario } = req.body

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id, 'solicitacoes._id': req.params.solicitacaoId  },
        {
          $set: {
            [`solicitacoes.$.respostas.${req.params.respostaSolicitacaoId}`]: {
              data,
              descricao,
              usuario
            }
          },
        },
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removeRespostaSolicitacao(req, res) {
    try {
      console.log(req.params.id)
      console.log(req.params.solicitacaoId)
      console.log(req.params.respostaSolicitacaoId)
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id, 'solicitacoes._id': req.params.solicitacaoId, },
        {
          $pull: { 'solicitacoes.$.respostas': { _id: req.params.respostaSolicitacaoId } }
        }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },




  async addComunicado(req, res) {
    try {
      const { data, descricao, aceite, aceiteID, usuario } = req.body;

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comunicados: {
              data,
              descricao,
              aceite,
              aceiteID,
              usuario
            },
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updateComunicado(req, res) {
    try {
      const { _id, data, descricao, aceite, aceiteID, usuario } = req.body;

      const empresaId = req.params.id; // Substitua pelo ID da sua empresa

      const empresa = await Empresa.findOneAndUpdate(
        {
          _id: empresaId,
          'comunicados._id': _id
        },
        {
          $set: {
            'comunicados.$.data': data,
            'comunicados.$.descricao': descricao,
            'comunicados.$.aceite': aceite,
            'comunicados.$.aceiteID': aceiteID,
            'comunicados.$.usuario': usuario,
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removeComunicado(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { comunicados: { _id: req.params.comunicadoId } }
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      if (!empresa)
        return res.status(400).json({ message: 'erro ao remover registro' });
      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async addHistoricoAcao(req, res) {
    try {
      const { data, descricao, responsavel, etapa, usuario } = req.body;

      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            historicoAcao: {
              data,
              descricao,
              responsavel,
              etapa,
              usuario
            },
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  async updateHistoricoAcao(req, res) {
    try {
      const { _id, data, descricao, responsavel, etapa, usuario } = req.body;

      const empresaId = req.params.id; // Substitua pelo ID da sua empresa

      const empresa = await Empresa.findOneAndUpdate(
        {
          _id: empresaId,
          'historicoAcao._id': _id
        },
        {
          $set: {
            'historicoAcao.$.data': data,
            'historicoAcao.$.descricao': descricao,
            'historicoAcao.$.responsavel': responsavel,
            'historicoAcao.$.etapa': etapa,
            'historicoAcao.$.usuario': usuario,
          },
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico');

      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  async removeHistoricoAcao(req, res) {
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { historicoAcao: { _id: req.params.historicoAcaoId } }
        },
        { new: true }
      )
        .populate('area')
        .populate('usuario')
        .populate('grupo')
        .populate('grupo.empresas')
        .populate('tecnico')

      if (!empresa)
        return res.status(400).json({ message: 'erro ao remover registro' });
      return res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },


  // Deletar uma empresa existente
  async delete(req, res) {
    try {
      const empresa = await Empresa.findByIdAndDelete(req.params.id);
      if (empresa) {
        const id = empresa._id;
        return res.status(201).json(id);
      } else {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = EmpresaController;