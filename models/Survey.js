var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  // list: {type: Schema.Types.ObjectId, index: true},
  // listid: {type: String, required: true},
  title: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  numReply: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  listId: {type: Schema.Types.ObjectId, index: true, required: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
