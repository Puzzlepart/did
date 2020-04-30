import app from './app';
import http from 'http';
var port = process.env.PORT || '8080';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

server.on('error', (error: Error) => {
  throw error;
});

server.on('listening', () => {
  console.log('\x1b[32m', `[Server listening on port ${port}]`);
});