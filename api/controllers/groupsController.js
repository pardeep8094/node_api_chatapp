var mongoose = require('mongoose');
groupData = mongoose.model('groups');
const uuidv1 = require('uuid/v1');
var error = require('./errors.js');
// customer model
customerData = mongoose.model('customers');

exports.getGroups = function(req, res, next) {
	groupData.find({}, function(err, groups1) {
		if(err)
			return res.json(err);
		res.json(groups1);
	});
}

exports.getGroupInfo = function(req, res, next) {
	groupData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	},{
		title : 1, 
		image : 1,
		members : 1
	},function(err, groups) {
		if(err) {
			return res.json(err);
		}
		if(groups[0]) {
			// res.json(groups);
			return  res.json({
				"group_id" : groups[0]._id,
				"name" : groups[0].title,
				"image" : groups[0].image,
				"totalMembers" : groups[0].members.length
			});


		} else {
			res.json(error.dataNotFound());
		}	
		
	});
}

exports.getGroupParticipantInfo = function(req, res, next) {
	console.log("JAI SHREE RAM");
	groupData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}

		if(groups[0]) {
			// getting customer info by members
			groupsMemers = groups[0].members;
			groupsMemersCollection = [];
			for (var i = 0; i < groupsMemers.length; i++) {
				groupsMemersCollection.push(mongoose.Types.ObjectId(groupsMemers[i]));

			}
			customerData.find({
				_id : { $in : groupsMemersCollection }
			}, {
				profile_image : 1, 
				name : 1
			},function(err, customer1) {
				if(err)
					return res.json(err);
				if(customer1) {
					return res.json(customer1);
				} else {
					res.json(error.dataNotFound());
				}
			});
			// return res.json(groups);
		} else {
			res.json(error.dataNotFound());
		}

	});
	// 
			
}