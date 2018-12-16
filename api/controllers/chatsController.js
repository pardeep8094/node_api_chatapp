var mongoose = require('mongoose');
chatData = mongoose.model('chats');

exports.getChats = function(req, res, next) {
	chatData.find({}, function(err, chates1) {
		if(err)
			return res.json(err);
		res.json(chates1);
	})
}


// use in array for find data in database
// params(array) in database
exports.getChat = function(req, res, next) {
	chatData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, chates1) {
		if(err) {
			return res.json(err);
		}
		res.json(chates1);
	})
}