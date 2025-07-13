const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: { 
    type: String,
    required: true,
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
  vocabulary: [ // Array de objetos para vocabulário destacado
    {
      word: { type: String, required: true },
      explanation: { type: String, required: true }, // Explicação 
    },
  ],
  externalLink: { // Para recursos externos
    type: String,
    required: function() { return this.type !== 'leitura' && this.type !== 'exercicio'; } 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model('Material', MaterialSchema);