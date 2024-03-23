const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  fs.readFile(__dirname + req.url, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('Error:' + err + '.')
    }
    else {
      res.writeHead(200, {'Content-Type': 'text/html'}, {'Access-Control_Allow-Origin': '*'});
      res.end(data);
    }
  })
}).listen(8000);