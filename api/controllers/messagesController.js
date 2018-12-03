var mongoose = require('mongoose');
messagesData = mongoose.model('messages');

exports.getAllMessages = function(req, res, next) {
	messagesData.find({}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	})
}