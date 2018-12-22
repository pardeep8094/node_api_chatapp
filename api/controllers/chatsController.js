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
	console.log("JAI SHREE RAM");
	var chatWithData;
    var callback = function(data){
       	messagesData.findOne({
			_id : mongoose.Types.ObjectId(data[0].last_message_id)
		},{
			message_body : 1,
			_id : 0
		},function(err, chatMessage) {
			if(err || !chatMessage) {
				return res.json(err);
			}
			// res.json(chatMessage);
			data[0].last_message = chatMessage.message_body;
			res.json(data);
		});
    };

	chatData.findOne({
		_id : mongoose.Types.ObjectId(req.params.chatid)
	}, function(err, chat) {
		if(err || !chat) {
			return res.json(err);
		}
		if (chat.is_group) {
			// getChatWithGroup
			// getting group info
			groupData.findOne({
					_id : mongoose.Types.ObjectId(chat.group_id)
				},{
					title : 1, 
					image : 1,
					members : 1
				},function(err, groups) {
					if(err || !groups) {
						return res.json(err);
					}
					chatWithData = [
						{
							"chat_id" : chat._id,
							"is_group" : true,
							"chat_with_data" : {
								"group_id" : groups._id,
								"name" : groups.title,
								"image" : groups.image,
								"totalMembers" : groups.members.length
							},
							"last_message_id" : chat.last_message_id,
							"last_message" : ""
						}
					];
					callback(chatWithData);
				});
		} else {
			// getChatWithCustomers
		 	memberArray = chat.members;
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
					return res.json(err);
				}
					chatWithData = [
						{
							"chat_id" : chat._id,
							"is_group" : false,
							"chat_with_data" : {
								"customer_id" : customer._id,
								"name" : customer.name,
								"image" : customer.profile_image
							},
							"last_message_id" : chat.last_message_id,
							"last_message" : ""
						}
					];
					callback(chatWithData);
			})
		}
	})
}
