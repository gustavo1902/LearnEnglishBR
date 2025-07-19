const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const protect = require('../middleware/authMiddleware');

router.get('/', async (req, res) => { 
  try {
    const { type, level } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }
    if (level) {
      query.level = level;
    }

    const materials = await Material.find(query).sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao buscar materiais' });
  }
});

router.post('/', protect, async (req, res) => { 
  const { title, content, level, type, vocabulary, externalLink, questions } = req.body; 

  try {
    const newMaterial = await Material.create({
      title,
      content,
      level,
      type,
      vocabulary,
      externalLink,
      questions, 
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao criar material' });
  }
});

module.exports = router;