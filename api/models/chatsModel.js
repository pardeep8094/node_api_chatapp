var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId 
  },
  members: {
    type: Array,
    required: true
  },
  is_group: {
    type: Boolean,
    required: true
  },
  last_message_id: {
    type: String,
    required: true
  },
  group_id: {
    type: String,
    required: true
  }
}, {
    versionKey: false
});

module.exports = mongoose.model('chats', TaskSchema);