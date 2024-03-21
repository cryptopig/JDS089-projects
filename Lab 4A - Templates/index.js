const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    // for debugging
    console.log(__dirname, req.url);

    // routes
    if (req.url == '/' || req.url == '/home') {
        req.url = '/index.html';
    }
    
    
    // header
    fs.readFile("header.inc", (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(data);
        
    });
    
    fs.readFile(__dirname + req.url.replace('.html', '.inc'), (err, data) => {
       if (err) {
           res.writeHead(404, { 'Content-Type': 'text/html'});
           res.end('404: File not found.');
       } else {
           res.writeHead(200, {'Content-Type': 'text/html'});
           res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
           res.write(data);
           
       }
        
    });
    
    // footer
    fs.readFile("footer.inc", (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(data); // end of data, so it should be res.end(data)

    });
}).listen(8080);