// backend/models/Material.js
const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  
  content: {
    type: String,
    required: function() { return this.type === 'leitura'; },
  },
  level: {
    type: String,
    enum: ['iniciante', 'intermediario', 'avancado'],
    required: true,
  },
  type: { 
    type: String,
    enum: ['leitura', 'exercicio', 'video', 'podcast', 'site'],
    required: true,
  },
  vocabulary: [
    {
      word: { type: String, required: true },
      explanation: { type: String, required: true },
    },
  ],
  externalLink: {
    type: String,
    required: function() { return this.type !== 'leitura' && this.type !== 'exercicio'; }
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [
        {
          optionText: { type: String, required: true },
          isCorrect: { type: Boolean, required: true, default: false },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Material', MaterialSchema);