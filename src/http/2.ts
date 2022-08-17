import http from "http";

http.createServer((req, res) => {
	let body = "";
	let i = 0;
	req.on("data", function (chunk) {
		body += chunk.toString();
		i++;
	});
	req.on("end", function () {
		console.log(i);
		res.end();
	});
}).listen(3000);