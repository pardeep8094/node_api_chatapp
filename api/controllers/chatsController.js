var mongoose = require('mongoose');
groupData = mongoose.model('chats');

exports.getChats = function(req, res, next) {
	groupData.find({}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	})
}