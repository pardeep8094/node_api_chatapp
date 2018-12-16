exports.undefinedValue = function(req, res) {
	const error = new Error("Required values are not given");
	error.Name = "Undefined Values";
	error.Status = "400";
	return error;
}

exports.duplicateEmail = function(req, res) {
	const error = new Error("This Email Id is already exist.");
	error.name = "Duplicate Email";
	error.Status = "409";
	return error;
}

exports.dataNotFound = function(req, res) {
	const error = new Error("Specific request data not found.");
	error.name = "Not Found";
	error.Status = "404";
	return error;
}