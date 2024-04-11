const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    let header = "";
    let content = "";
    let footer = "";

    console.log(__dirname, req.url);

    if (req.url == "/") {
        req.url = "/index.html";
    }

    // header
    fs.readFile("header.html", (err, data) => {
        if (err) {
            handleError(res, err);
            return;
        }
        header = data;
        writeContent();
    });

    // footer
    fs.readFile("footer.html", (err, data) => {
        if (err) {
            handleError(res, err);
            return;
        }
        footer = data;
        writeContent();
    });

    // content
    if (req.url.endsWith(".html")) {
        fs.readFile(__dirname + req.url.replace(".html", ".html"), (err, data) => {
            if (err) {
                handleError(res, err);
                return;
            }
            content = data;
            writeContent();
        });
    } else {
        // Non-HTML files
        fs.readFile(__dirname + req.url, (err, data) => {
            if (err) {
                handleError(res, err);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }

    function writeContent() {
        // Check if all files have been read
        if (header && content && footer) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(header);
            res.write(content);
            res.end(footer);
        }
    }

    function handleError(res, err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('500: Internal Server Error');
    }
}).listen(PORT);

console.log(`Server running on port ${PORT}`);
