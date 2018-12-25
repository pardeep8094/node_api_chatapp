var mongoose = require('mongoose');
chatData = mongoose.model('chats');
var error = require('./errors.js');

groupData = mongoose.model('groups');
customerData = mongoose.model('customers');
messagesData = mongoose.model('messages');

exports.getChats = function(req, res, next) {
	chatData.find({}, function(err, chates1) {
		if(err)
			return res.json(err);
		res.json(chates1);
	})
}

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
	

exports.getCustomerChatInfo = function(req, res, next) {
	var promisesArray = [];
	var chatForCustomerArr = [];
    /////////////////////   doAsyncTask calling   //////////////////////////////
	function doAsyncTask(chatId) {
		return new Promise(function(resolve, reject) {
	 		chatData.findOne({
				_id : mongoose.Types.ObjectId(chatId)
			}, function(err, chatDetails) {
				if(err || !chatDetails) {
					reject('fail');
				}

				if (chatDetails.is_group) {
					// getChatWithGroup
					// getting group info
					groupData.findOne({
							_id : mongoose.Types.ObjectId(chatDetails.group_id)
						},{
							title : 1, 
							image : 1,
							members : 1
						},function(err, groups) {
							if(err || !groups) {
								reject('fail');
							}
							// getting last message
							// messagesData.findOne({
							// 	_id : mongoose.Types.ObjectId(chatDetails.last_message_id)
							// },{
							// 	message_body : 1,
							// 	_id : 0
							// },function(err, chatMessage) {
							// 	if(err || !chatMessage) {
							// 		reject('fail');
							// 	}
								// chatForCustomerArr.push({
								// 	"chat_id" : chatDetails._id,
								// 	"is_group" : true,
								// 	"chat_with_data" : {
								// 		"group_id" : groups._id,
								// 		"name" : groups.title,
								// 		"image" : groups.image,
								// 		"totalMembers" : groups.members.length
								// 	},
								// 	"last_message_id" : chatDetails.last_message_id,
								// 	"last_message" : {
								// 		"message_body" : chatMessage.message_body,
								// 		"message_time" : "" // chatMessage..time).getHours()
								// 	}
								// });
								getLastMessage(chatDetails.last_message_id).then(function(res) {
									console.log("res", res);
									chatForCustomerArr.push({
										"chat_id" : chatDetails._id,
										"is_group" : true,
										"chat_with_data" : {
											"group_id" : groups._id,
											"name" : groups.title,
											"image" : groups.image,
											"totalMembers" : groups.members.length
										},
										"last_message_id" : chatDetails.last_message_id,
										"last_message" : {
											"message_body" : res.message_body,
											"message_time" : "" // chatMessage..time).getHours()
										}
									});
									resolve('done'); 
								});
								
							// });
						});
				} else {
					// getChatWithCustomers
				 	memberArray = chatDetails.members;
		            indexOfRemoveElement = (memberArray .indexOf(req.params.customerid));
		            memberArray.splice(indexOfRemoveElement,1);
		            // getting customer info
		            // console.log(memberArray);
					customerData.findOne({
						_id : mongoose.Types.ObjectId(memberArray[0])
					},{
						name : 1,
						profile_image : 1
					}, function(err, customer) {
						if(err || !customer) {
							reject('fail');
						}
						// getting last message
						// messagesData.findOne({
						// 	_id : mongoose.Types.ObjectId(chatDetails.last_message_id)
						// },{
						// 	message_body : 1,
						// 	_id : 0
						// },function(err, chatMessage) {
						// 	if(err || !chatMessage) {
						// 		reject('fail');
						// 	}
							// chatForCustomerArr.push({
							// 	"chat_id" : chatDetails._id,
							// 	"is_group" : false,
							// 	"chat_with_data" : {
							// 		"customer_id" : customer._id,
							// 		"name" : customer.name,
							// 		"image" : customer.profile_image
							// 	},
							// 	"last_message_id" : chatDetails.last_message_id,
							// 	"last_message" : {
							// 		"message_body" : chatMessage.message_body,
							// 		"message_time" : "" // chatMessage..time).getHours()
							// 	}
							// });
							getLastMessage(chatDetails.last_message_id).then(function(res) {
								console.log("res", res);
								chatForCustomerArr.push({
									"chat_id" : chatDetails._id, 
									"is_group" : false,
									"chat_with_data" : {
										"customer_id" : customer._id,
										"name" : customer.name,
										"image" : customer.profile_image
									},
									"last_message_id" : chatDetails.last_message_id,
									"last_message" : {
										"message_body" : res.message_body,
										"message_time" : "" // chatMessage..time).getHours()
									}
								});

								resolve('done'); 
							});

						// });	
					})
				}
				});			
			});		
	}

	function getLastMessage(lastMessage) {
		return new Promise(function(resolve, reject) {
			messagesData.findOne({
				_id : mongoose.Types.ObjectId(lastMessage)
			},{
				message_body : 1,
				_id : 0
			},function(err, chatMessage) {
				if (err) {
					return "";
				}
				resolve(chatMessage);
			});	
		});	
	}

	// end doAsyncTask function calling
	customerData.findOne({
		_id : mongoose.Types.ObjectId(req.params.customerid)
	},function(err, customerChats) {
		if(err || !customerChats) {
			return res.json(err);
		}
		customerChats.chat_ids.forEach(function(chatId) {
	 		promisesArray.push(doAsyncTask(chatId));
		});	
		Promise
			.all(promisesArray)
			.then(function(value) {
				return res.json({
					"id" : req.params.customerid,
					"last_seen" : customerChats.last_seen,
					"name" : customerChats.name,
					"profile_image" : customerChats.profile_image,
					"chat_list" : chatForCustomerArr	
				});
			});
	});
}

