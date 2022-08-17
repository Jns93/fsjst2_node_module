import net from "net";
//DIVIDIR A REQUISIÇÃO EM 3 PARTES:
net.createServer((socket) => {
   socket.on("data", function (chunk) { 
       const requestRaw = chunk.toString("ascii");
       const [requestLineAndHeaders, body] = requestRaw.split("\r\n\r\n");

       console.log(requestLineAndHeaders);
       console.log(body);

       const [requestLine, ...headers] = requestLineAndHeaders.split("\r\n");
       console.log(requestLine);
         console.log(headers);

        const [method, url, protocol] = requestLine.split(" ");
        console.log(method, url, protocol);
         
       

        socket.end();
   });
}).listen(3000);