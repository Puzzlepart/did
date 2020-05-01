import app from './app';
import http from 'http';
const debug = require('debug')('server');
var port = process.env.PORT || '8080';
app.set('port', port);

var server = http.createServer(app);

server
  .listen(port)
  .on('error', (error: Error) => {
    debug('An error occured: %s', error.message);
  })
  .on('listening', () => {
    debug('Server listening on port %s', port);
  });