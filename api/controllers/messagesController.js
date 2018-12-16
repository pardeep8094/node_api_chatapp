var mongoose = require('mongoose');
messagesData = mongoose.model('messages');

exports.getAllMessages = function(req, res, next) {
	messagesData.find({}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	})
}

exports.getMessage = function(req, res, next) {
	messagesData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, mess) {
		if(err) {
			return res.json(err);
		}
		res.json(mess);
	})
}

exports.getChatmessages = function(req, res, next) {
	messagesData.find({
		chat_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	})
}