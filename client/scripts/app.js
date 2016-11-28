// YOUR CODE HERE:
var app = {};

app.init = () => {

};

app.send = message => {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: data => {
      console.log('chatterbox: Message sent');
    },
    error: data => {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    type: 'GET'
  });
};
