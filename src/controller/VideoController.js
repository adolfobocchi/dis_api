const Video = require('../models/Video');
require('dotenv').config();
const fs = require('fs');

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

const VideoController = {
  async listar (req, res) {
    try {
      const {page, ativo} = req.params;
      let videos = null;
      if (ativo == 1 && page > 0) {
        videos = await Video.find({ ativo: true })
          .limit(10)
          .skip((page-1) * 10).sort({ nome: 1 })
      } else if (ativo == 0 && page > 0){
        videos = await Video.find()
        .limit(10)
        .skip((page-1) * 10).sort({ nome: 1 })
      } else if( ativo == 1 && page == 0) {
        videos = await Video.find({ ativo: true }).sort({ nome: 1 })
      } else if(ativo == 0 && page == 0) {
        videos = await Video.find().sort({ nome: 1 })
      }
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Criar uma nova video
  async criar(req, res) {
    try {
      const {titulo, descricao, data, ativo, usuario } = JSON.parse(req.body.video);
      if (req.files && Object.keys(req.files).length > 0) {
        var video = req.files.videoFile[0].filename;
      }
      const novaVideo = await Video.create({titulo, descricao, data, video, ativo, usuario });
      res.status(201).json(novaVideo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Buscar uma video pelo ID
  async show (req, res) {
    try {
      const video = await Video.findById(req.params.id);
      if (video) {
        res.status(201).json(video);
      } else {
        res.status(404).json({ message: 'Video não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Atualizar uma video existente
  async update(req, res) {
    try {
      const {titulo, descricao, data, ativo, usuario } = JSON.parse(req.body.video);
      if (req.files && Object.keys(req.files).length > 0) {
        var video = req.files.videoFile[0].filename;
      }
      const updateVideo = await Video.findByIdAndUpdate(req.params.id, {titulo, descricao, data, video, ativo, usuario},  { new: true });
      res.status(201).json(updateVideo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Deletar uma video existente
  async delete(req, res) {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
      if (video) {
        const id = video._id;
        res.status(201).json(id);
      } else {
        res.status(404).json({ message: 'Video não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  };
  
  module.exports = VideoController;
