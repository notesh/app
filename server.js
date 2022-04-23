
import http from "http"
import fs from "fs"

const PORT = 8080;

var style = fs.readFileSync('output.css', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
});

var index = fs.readFileSync('index.html', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
});

var script = fs.readFileSync('script.js', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
});

http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200
    console.log(req.url)
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write(index);
    }
    if (req.url === '/script.js') {
        res.setHeader('Content-Type', 'text/javascript')
        res.write(script);
    }
    if (req.url === '/output.css') {
        res.setHeader('Content-Type', 'text/css')
        res.write(style);
    }
    res.end()
}).listen(PORT);
