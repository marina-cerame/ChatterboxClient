// YOUR CODE HERE:
var app = {};

app.init = () => {
  $('.username').on('click', app.handleUsernameClick);
  $('#send .submit').on('submit', app.handleSubmit);
};

app.send = (message) => {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',

    success: (data) => {
      console.log('chatterbox: Message sent');
    },
    error: (data) => {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    type: 'GET'
  });
};

app.clearMessages = () => {
  $('#chats').empty();
};

app.renderMessage = (message) => {
  var $message = $('<div>').text(message.text);
  $message.appendTo($('#chats'));
  var $username = $('<span>').text(message.username).addClass('username');
  $username.appendTo($message);
};

app.renderRoom = (room) => {
  var $room = $('<div>').text(room);
  $room.appendTo($('#roomSelect'));
};

app.handleUsernameClick = () => {

};

app.handleSubmit = () => {

};

// $('.username').on('click', app.handleUsernameClick);
