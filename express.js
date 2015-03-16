var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env['PORT'])

app.engine('html', require('ejs').renderFile);

app.get('*', (req, res) => {
  res.render('index')
});
