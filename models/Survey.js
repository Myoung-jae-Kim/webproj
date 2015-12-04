var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  numReply: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
