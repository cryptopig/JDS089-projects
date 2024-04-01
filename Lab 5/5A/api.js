var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var parsedURL = url.parse(req.url, true);
    if (parsedURL.pathname == "/capitals.json") {
        console.log(parsedURL.query.search, parsedURL.query.sort);
        var requestedSort = parsedURL.query.sort ? parsedURL.query.sort : 'default';
        var requestedSearch = parsedURL.query.search ? parsedURL.query.search : 'default';

        fs.readFile('capitals.json', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(textToJson(data, requestedSearch, requestedSort));
            return res.end();
        });
    } else if (req.url == "/capitals.csv" || req.url == "/capitals.json" || req.url == "/capitals.txt" || req.url == "/api.js" || req.url == "/static.js") {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("404: File not found");
    } else {
        fs.readFile(__dirname + req.url, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("404: File not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
}).listen(8000);

function textToJson(data, search, sortField) {
    console.log("textToJson", search, sortField);
    let objects = [];
    let lines = data.toString().split("\n");
    for (let i=2; i < lines.length; i++) {
        if (lines[i].length < 2) {
            continue;
        }
        if (search != "" && lines[i].toLowerCase().indexOf(search.toLowerCase())< 0) {
            continue;
        }

        const fields = lines[i].split("|");
        const foodObj = {};
        foodObj.foodName = fields[0];
        foodObj.price = fields[1];
        foodObj. calories = fields[2];
        objects.push (foodObj);

        if (sortField == "foodName") {
            console.log("sorting by food name.");
            objects.sort(cmpString);
        }

        else if (sortField == "price" || sortField == "calories") {
            objects.sort(cmpNumeric);
        }

        return JSON.stringify(objects, null, 2);

    }

    function cmpString(a, b) {
        if ((a[sortField]) < (b[sortField])) {
            return -1;
        }
        else if ((a[sortField]) > (b[sortField])) {
            return 1
        }

        return 0
    }
    function cmpNumeric(a, b) {
        if (parseInt(a[sortField]) < parseInt(b[sortField])) {
            return -1;
        }
        else if (parseInt(a[sortField]) > parseInt(b[sortField])) {
            return 1
        }

        return 0
    }
}
