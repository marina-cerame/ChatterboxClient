// YOUR CODE HERE:
$(document).ready(function () {
  app.init();
});

var app = {};

app.username = window.location.search.split('=')[1];
app.friends = [];

app.init = () => {
  console.log('init called');
  $('.username').unbind('click').bind('click', function() {
    app.handleUsernameClick();
  });

  $('.submit').unbind('submit').bind('submit', function(event) {
    app.handleSubmit($('#message').val());
    $('#message').val('');
    console.log('new message~');
    event.preventDefault();
    return false;
  });
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
  let $newMessage = $('<div>');
  $newMessage.appendTo($('#chats'));

  var $username = $('<div>')
    .text(message.username)
    .addClass('username')
    .addClass(message.username)
    .attr('username', message.username);
  $username.appendTo($newMessage);
  var $message = $('<div>').text(message.text);
  $message.appendTo($newMessage);

  $('.username').on('click', function() {
    console.log(this);
    app.handleUsernameClick(this);
  });

};

app.renderRoom = (room) => {
  var $room = $('<div>').text(room);
  $room.appendTo($('#roomSelect'));
};

app.handleUsernameClick = (div) => {
  var friend = $(div).text();
  var $friend = $(div);
  // $friend.addClass('friend');
  $('[username =' + friend + ']').addClass('friend');
  if (!_.contains(app.friends, friend)) {
    app.friends.push(friend);
  }
  console.log(app.friends);
};

app.handleSubmit = (message) => {
  console.log('message', message);
  let newPost = {
    username: app.username,
    text: message,
    roomName: null
  };
  app.send(newPost);
  app.renderMessage(newPost);
};


app.toggleRooms = function() {
  console.log('thing');
  document.getElementById('roomList').classList.toggle('show');
};

app.addRoom = function() {
  var roomName = prompt('What would you like to call your room?');
  $('.dropdown-content').append($('<a href="#">' + roomName + '</a>'));

};
