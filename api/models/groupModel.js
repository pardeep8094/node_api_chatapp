var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId 
  },
  admin_id: {
    type: Array,
    required: true
  },
  members: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
}, {
    versionKey: false
});

module.exports = mongoose.model('groups', TaskSchema);