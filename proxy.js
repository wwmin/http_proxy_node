var http = require('http');
var httpProxy = require("http-proxy");

var PORT = 8080;
// var targetUrl = "http://xxx.xxx.com";
var targetUrl = "http://localhost:8000";
var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ignorePath: false //ignorePath用于转发请求时，是否将原请求地址中的path附加到转发地址后面。
});
proxy.on("error", function (err, req, res) {
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    res.write("error!");
    res.end();
});

proxy.on("proxyReq", function (proxyReq, req, res) {
    console.log("url:" + proxyReq.path);
})

proxy.on("proxyRes", function (proxyRes, req, res) {
    let host = proxyRes.req.getHeader("host");
    let path = proxyRes.req.path;
    console.log(host);
    console.log(path);
})

var app = http.createServer(function (req, res) {

    proxy.web(req, res, {
        target: targetUrl
    });
});

app.listen(PORT, function () {
    console.info("server is running at %d, tip: this proxy_js only proxy url", PORT);
})