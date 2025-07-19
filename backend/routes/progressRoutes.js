const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
    const { materialId, score, totalQuestions } = req.body;
    const userId = req.user._id;

    try {
        const existingProgress = await UserProgress.findOneAndUpdate(
            { user: userId, material: materialId },
            { score, totalQuestions, completedAt: Date.now() },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(201).json(existingProgress);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Progresso para este material já registrado por este usuário.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor ao salvar progresso.' });
    }
});

router.get('/', protect, async (req, res) => {
    const userId = req.user._id;

    try {
        const progress = await UserProgress.find({ user: userId }).populate('material', 'title level type');
        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor ao buscar progresso.' });
    }
});

module.exports = router;
