var mongoose = require('mongoose');
groupData = mongoose.model('groups');

exports.getGroupDetails = function(req, res, next) {
	groupData.find({}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	})
}