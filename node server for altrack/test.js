var app = require('./app');
var debug = require('debug')('node-server-for-altrack:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

app.set('port', port);
console.log("working")