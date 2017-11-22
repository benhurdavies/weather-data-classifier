import express from 'express';
import http from 'http';
import path from 'path';

import magicRouter from 'magic-router';

const port = 3000;
const app = express();

app.use(express.static( path.join(__dirname + '/public')));
app.set("view engine","vash");

// adding contollers..
magicRouter.addAll(app, { dirPath: './controllers' });

app.get('*', function(req, res) {
  res.send('App started');
});

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
server.on('listening', onListening);
module.exports = server.listen(port);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + addr.toString());
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
