// This is the mocked ECS service
const http = require('http');

// This is the comment, for testing.

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end();
}).listen(3000);
