import net from "net";


//PEGAR O BODY DA REQUISIÇÃO

net.createServer((socket) => {
   let request: Request;
   let response: Response;

   //O BODY VEM DIVIDIDO EM CHUNKS
   let buffer = Buffer.alloc(0);
   let chunkCount = 0;
   let contentLength: number;
   socket.on("data", function (chunk) { 
      //NO PRIMEIRO CHUNK VEM A REQUEST LINE E OS HEADERS
      buffer = Buffer.concat([buffer, chunk]);
      chunkCount++;
      if (chunkCount === 1) {
         const requestRaw = chunk.toString("ascii");
         const [requestLineAndHeaders] = requestRaw.split("\r\n\r\n");
         const [requestLine, ...headersRaw] = requestLineAndHeaders.split("\r\n");
         const [method, url, protocol] = requestLine.split(" ");
         const headers: { [key: string]: string } = {};
         
         for(const headerRaw of headersRaw) {
            console.log(headerRaw);
            
            const [key, value] = headerRaw.split(": ");
            headers[key] = value;
         }
         request = new Request(method, url, protocol, headers);
         contentLength = parseInt(headers["Content-Length"]);
      }

      //NO ULTIMO CHUNK É GERADO O RESPONSE
      const lastChunk = contentLength && buffer.length > contentLength;
      if(lastChunk) {
         if(request) {
            const data = buffer.toString();
            const [, body] = data.split("\r\n\r\n");
            request.body = body;
            console.log(request.body.length);
         }
         console.log('Request ==>', request);
         
         response = new Response(200, { "content-type": "text/plain", "User Agent": "net" }, "OK");
         socket.write(response.value);
         socket.end();
      }
   });
}).listen(3000);

class Request {
   body?: string;

   constructor(readonly method: string, readonly url: string, readonly protocol: string, readonly headers: { [key: string]: string }) {
   }
}

class Response {
   value: string;
   status: { [key: string]: string } = {
      200: "OK",
   }

   constructor(readonly statusCode: number, readonly headers: { [key: string]: string }, readonly body: string) {
      const separator = "\r\n";
      const responseLine = `HTTP/1.1 ${statusCode} ${this.status[statusCode]}\r\n`;
      this.value = [
         responseLine,
         separator,
         Object.entries(headers).map(entry => `${entry[0]}: ${entry[1]}`).join(separator), //MONTANDO O HEADER
         separator,
         separator,
         body,
         separator
      ].join("");
   }

}
