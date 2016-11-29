// YOUR CODE HERE:
$(document).ready(function () {
  app.init();
  app.fetch();
  setInterval(app.fetch, 10000);
});

var app = {};
app.friends = [];
app.username = window.location.search.split('=')[1];
app.room = 'lobby';

app.escapeHtml = function (string) {
  var entityMap = {
    // '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    // '"': '&quot;',
    // '/': '&#x2F;'
  };
  return String(string).replace(/[<>]/g, function (s) {
    return entityMap[s];
  });
};
app.safeUsername = app.escapeHtml(app.username);

app.init = () => {
  $('.username').unbind('click').bind('click', function() {
    app.handleUsernameClick();
  });

  $('.submit').unbind('submit').bind('submit', function(event) {
    app.handleSubmit($('#message').val());
    $('#message').val('');
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

app.fetch = function () {
  app.clearMessages();
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'jsonp',
    success: function(data) {
      for (let i = data.results.length - 1; i > -1; i--) {
        app.renderMessage(data.results[i]);
      }
    }
  });
};

app.clearMessages = () => {
  $('#chats').empty();
};

app.renderMessage = (message) => {
  let $newMessage = $('<div>');
  $newMessage.attr('roomName', message.roomName).prependTo($('#chats'));
  var $username = $('<div>')
    .text(message.username)
    .addClass('username')
    .addClass(message.username)
    .attr('username', message.username);
  $username.appendTo($newMessage);
  var $message = $('<div>').text(message.text);
  $message.appendTo($newMessage);

  app.friends.forEach(function(friend) {
    $('[username =' + friend + ']').addClass('friend');
  });

  app.renderRoom(app.room);

  $('.username').on('click', function() {
    console.log(this);
    app.handleUsernameClick(this);
  });

};

app.renderRoom = (room) => {
  $('#chats').children().not($('[roomName =' + room + ']')).hide();
  app.room = room;
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

  let newPost = {
    username: app.safeUsername,
    text: message,
    roomName: app.room
  };
  app.send(newPost);
  app.renderMessage(newPost);
};


app.toggleRooms = function() {
  document.getElementById('roomList').classList.toggle('show');
};

app.addRoom = function() {
  var roomName = prompt('What would you like to call your room?');
  $('.dropdown-content').append($('<a href="#" onclick=\'app.renderRoom("' + roomName + '")\'>' + roomName + '</a>'));
  app.room = roomName;
  app.renderRoom(roomName);
};
