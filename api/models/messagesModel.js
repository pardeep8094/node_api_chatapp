var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId 
  },
  chat_id: {
    type: String,
    required: true
  },
  message_body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  }
}, {
    versionKey: false
});

module.exports = mongoose.model('messages', TaskSchema);