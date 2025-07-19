const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Material',
    },
    score: {
        type: Number,
        required: true,
        min: 0,
    },
    totalQuestions: {
        type: Number,
        required: true,
        min: 1,
    },
    completedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

UserProgressSchema.index({ user: 1, material: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);
