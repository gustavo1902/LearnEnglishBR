const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para fazer hash da senha

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
    // Adiciona um campo para armazenar o hash da senha
  createdAt: {
    type: Date,
    default: Date.now,
  },
});






module.exports = mongoose.model('User', UserSchema);