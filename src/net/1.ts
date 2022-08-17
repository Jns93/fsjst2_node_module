 import net from "net";

 net.createServer((socket) => {
    socket.on("data", function (chunk) {
        console.log(chunk.toString());
        socket.end();
    });
 }).listen(3000);

 //para startar o servidor: npx nodemon src/net/1.ts
 //para enviar dados para o servidor (em outro terminal): curl -d "João" http://localhost:3000

 //######################################
//Requisição HTTPs são divididas em 3 partes:	
    
//1. Request Line: Onde está o método, a URL e o protocolo.
// POST / HTTP/1.1

//2. Headers: Os cabeçalhos da requisição.
// Host: localhost:3000
// User-Agent: curl/7.83.1
// Accept: */*
// Content-Length: 4
// Content-Type: application/x-www-form-urlencoded

//3. Body: O corpo da requisição. (OPCIONAL)
// Jo�o