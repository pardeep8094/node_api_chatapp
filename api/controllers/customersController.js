var mongoose = require('mongoose');
customerData = mongoose.model('customers');
const uuidv1 = require('uuid/v1');
var error = require('./errors.js');

// req.params value is set when calling get api call
// re.body is used in post api call

exports.getCustomers = function(req, res, next) {
	customerData.find({}, function(err, groups) {
		if(err)
			return res.json(err);
		res.json(groups);
	})
}

exports.getCustomerDetails = function(req, res, next) {
	customerData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}
		res.json(groups);
	})
}

exports.getCustomerInfo = function(req, res, next) {
	customerData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	},{
		name : 1,
		profile_image : 1
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}
		if(groups[0]) {
			// res.json(groups);
			return  res.json({
				"customer_id" : groups[0]._id,
				"name" : groups[0].name,
				"image" : groups[0].profile_image
			});
		} else {
			res.json(error.dataNotFound());
		}
	})
}

exports.createCustomer = function(req, res, next) {
	var ObjectId = require('mongodb').ObjectID
	var id = new ObjectId();

	customerData.create(
	{
	  _id : id,	
	  name: req.body.name
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}
		res.json(groups);
	})
}

exports.updateManyCustomerDetails = function(req, res, next) {
	customerData.updateMany({name: req.params.id}, {$set:req.body}, 
		function(err, groups) {
			if(err) {
				return res.json(err);
			}
			res.json(groups);
		});
}

exports.updateCustomerDetails = function(req, res, next) {
	customerData.update({_id: req.params.id}, {$set:req.body}, 
		function(err, groups) {
			if(err) {
				return res.json(err);
			}
			res.json(groups);
		});
}


exports.deleteCustomer = function(req, res, next) {
	console.log(req.params.id);
	customerData.remove({
		_id: req.params.id
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}
		res.json(groups);
	});
}