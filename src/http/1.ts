import http from "http";

http.createServer((req, res) => {
    console.log(req);
    res.end();
}).listen(3000);