const http = require('http');
const app = require('./lib/app');
require('./lib/connect');

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
  //eslint-disable-next-line
  console.log('Server now listening at', server.address());
});