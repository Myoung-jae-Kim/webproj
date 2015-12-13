var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  survey: {type: Schema.Types.ObjectId, required: true, trim: true},
  // email: {type: String, required: true, trim: true},
  select: [],
  select2: [],
  select3: [],
  select4: [],
  longtext: {type: String, trim: true},
  text: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now}
},{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Reply = mongoose.model('Reply', schema);

module.exports = Reply;
