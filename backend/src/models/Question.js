const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    score: {type: Number, required: true},
    tags: [{type: String, required: true}],
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], default: 'easy'},
});

module.exports = mongoose.model('Question', questionSchema);