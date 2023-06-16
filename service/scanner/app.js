// This is the mocked ECS service. This is enhancement
const http = require('http');
// Add comments ....
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end();
}).listen(3000);
