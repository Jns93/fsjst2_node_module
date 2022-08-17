import net from "net";

net.createServer((socket) => {
   let request: Request;
   socket.on("data", function (chunk) { 
      const requestRaw = chunk.toString("ascii");
      const [requestLineAndHeaders, body] = requestRaw.split("\r\n\r\n");
      const [requestLine, ...headersRaw] = requestLineAndHeaders.split("\r\n");
      const [method, url, protocol] = requestLine.split(" ");
      const headers: { [key: string]: string } = {};
      
      for(const headerRaw of headersRaw) {
         console.log(headerRaw);
         
         const [key, value] = headerRaw.split(": ");
         headers[key] = value;
      }
      request = new Request(method, url, protocol, headers);
      console.log('Request ==>', request);
        socket.end();
   });
}).listen(3000);

class Request {
   constructor(readonly method: string, readonly url: string, readonly protocol: string, readonly headers: { [key: string]: string }) {
   }

}