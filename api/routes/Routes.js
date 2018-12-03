module.exports = function(app) {
  // var user = require('../controllers/userController');
  // var chat = require('../controllers/chatController');
  // var message = require('../controllers/messageController');
var groups = require('../controllers/groupsController');
var customers = require('../controllers/customersController');
var chats = require('../controllers/chatsController');
var messages = require('../controllers/messagesController');

// app.route('/group')
//     .get(groups.getGroupDetails);

app.route('/customers')
    .get(customers.getCustomers);

app.route('/customer')
    .post(customers.createCustomer);

app.route('/customer/:id')
    .get(customers.getCustomerDetails)
    .put(customers.updateCustomerDetails)
    .delete(customers.deleteCustomer);

// app.route('/customer/:id')
//     .get(customers.getCustomerDetails);

// app.route('/customerupdate/:id')
//     .put(customers.updateCustomerDetails);

// app.route('/customerDelete/:id')
//     .delete(customers.deleteCustomer);

  // app.route('/users')
  //   .get(user.showAllUsers)
  //   .post(user.createUser);

  // app.route('/users/:id')
  //   .put(user.updateUser)
  //   .get(user.getChats)
  //   .delete(user.deleteUser);

  // app.route('/users/:id/sendMessage')
  //   .post(user.sendMessage);

  // app.route('/chat/:id')
  //   .delete(chat.deleteChat);

  // app.route('/chat/:id/deleteMessages') 
  //   .delete(chat.deleteMessages);	

  // app.route('/message/:messageId')
  //   .get(message.getAllMessage);

app.route('/chats')
    .get(chats.getChats);

app.route('/messages')
    .get(messages.getAllMessages);

    
};