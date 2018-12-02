var mongoose = require('mongoose');
customerData = mongoose.model('customers');
const uuidv1 = require('uuid/v1');

// req.params value is set when calling get api call
// re.body is used in post api call

exports.getCustomers = function(req, res, next) {
	console.log("jai shree ram ji");
	customerData.find({}, function(err, groups) {
		if(err)
			return res.json(err);
		res.json(groups);
	})
}

exports.getCustomerDetails = function(req, res, next) {
	console.log("jai shree ram ji");
	customerData.find({
		_id : mongoose.Types.ObjectId(req.params.id)
	}, function(err, groups) {
		if(err) {
			return res.json(err);
		}
		res.json(groups);
	})
}

exports.createCustomer = function(req, res, next) {
	console.log("jai shree ram");
	console.log("jai hanuman ji");
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
	console.log("jai shree ram ji");

	customerData.updateMany({name: req.params.id}, {$set:req.body}, 
		function(err, groups) {
			if(err) {
				return res.json(err);
			}
			res.json(groups);
		});
}

exports.updateCustomerDetails = function(req, res, next) {
	console.log("jai shree ram ji");

	customerData.update({_id: req.params.id}, {$set:req.body}, 
		function(err, groups) {
			if(err) {
				return res.json(err);
			}
			res.json(groups);
		});
}


exports.deleteCustomer = function(req, res, next) {
	console.log("jai shree ram");
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