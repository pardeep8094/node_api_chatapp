var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId 
  },
  name: {
    type: String,
    required: true
  },
  last_seen: {
    type: Array,
    required: true
  },
  profile_image: {
    type: String,
    required: false
  },
  chat_ids: {
    type: Array,
    required: true
  }
}, {
    versionKey: false
});

module.exports = mongoose.model('customers', TaskSchema);