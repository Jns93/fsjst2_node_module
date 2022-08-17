import net from "net";

net.createServer((socket) => {
   let request: Request;
   let response: Response;
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
      response = new Response(200, { "content-type": "text/plain", "User Agent": "net" }, "OK");
      socket.write(response.value);
      socket.end();
   });
}).listen(3000);

class Request {
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
