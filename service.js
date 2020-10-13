var http = require("http");
http.createServer(function (request, response) {
    console.log("request received");
    response.writeHead(200, {
        "Context-Type": "text/plain"
    });
    response.write("I'm service A");
    response.end();
}).listen(8000);
console.log("service started");