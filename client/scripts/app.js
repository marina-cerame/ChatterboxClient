// YOUR CODE HERE:
$(document).ready(function () {
  app.init();
});

var app = {};

app.username = window.location.search.split('=')[1];
app.friends = [];

app.init = () => {
  console.log('init called');
  $('.username').on('click', function() {
    app.handleUsernameClick();
  });
  $('#send').submit(function(event) {
    app.handleSubmit($('#message').val());
    $('#message').val('');
    event.preventDefault();
  });
  console.log('things');
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
  var $username = $('<div>')
    .text(message.username)
    .addClass('username')
    .attr('fromUser', message.username);
  $username.appendTo($('#chats'));
  var $message = $('<div>').text(message.text);
  $message.appendTo($('#chats'));
  app.init();

};

app.renderRoom = (room) => {
  var $room = $('<div>').text(room);
  $room.appendTo($('#roomSelect'));
};

app.handleUsernameClick = () => {
  var friend = $('.username').text();

  if (!_.contains(app.friends, friend)) {
    app.friends.push(friend);
  }
  console.log(app.friends);
};

app.handleSubmit = (message) => {
  let newPost = {
    username: app.username,
    text: message,
    roomName: null
  };
  app.renderMessage(newPost);
};
