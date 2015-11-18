var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  content: {type: String, required: true, trim: true},
  category: {type: String, trim: true},
  deadline: Date,
  done: {type: Boolean, default: false},
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  createdAt: {type: Date, default: Date.now}
},{
  toJSON: {
    virtuals: true,
    transform: function(list) {
      return {
        id: list._id.toString(),
        category: list.category,
        content: list.content,
        deadline: (list.deadline) ? moment(list.deadline).format('YYYY-MM-DD') : "N/A",
        done: list.done
      };
    }
  },
  toObject: {virtuals: true}
});

var List = mongoose.model('List', schema);

module.exports = List;
