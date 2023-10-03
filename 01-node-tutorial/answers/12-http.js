const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to home page");
    } else if (req.url === "/about") {
        res.end("Its about me");
    } else {
        res.end(`
    <h1>Oops!</h1>
    <p>We cannot find the page you requested</p>
    <a href="/">back home</a>
    `);
    }
});

server.listen(3000);

// const http = require("http");
// const server = http.createServer((req, res) => {
//     console.log('server work');
//     console.log(req.url)
//     console.log(req.method);
//     res.setHeader("Content-Type", "text/html; charset=utf-8;");
//     res.write('<h2>Hello world!</h2>');
//     res.write("<p>Hello everyone!</p>");
//     res.end();
//     res.end('1');
// }).listen(3000);