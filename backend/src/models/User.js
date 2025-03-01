const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: {type: Number, default: 0},
  solvedQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  bookmarkedQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});

module.exports = mongoose.model('User', UserSchema); //mongodb collection name -> users // mongoose auto pluralizes user 

