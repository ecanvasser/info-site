let http = require("http");
let fs = require("fs");
let url = require("url");

http
  .createServer((req, res) => {
    let reqPath = url.parse(req.url);
    let fileName = "." + reqPath.pathname + ".html";

    if (reqPath.pathname === "/" || reqPath.pathname === "/favicon.ico") {
      fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading index.html");
        } else {
          res.write(data);
          res.end();
        }
      });
    } else {
      fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
          fs.readFile("./404.html", (err, data) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Error reading 404.html");
            } else {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            }
          });
        } else {
          res.write(data);
          res.end();
        }
      });
    }
  })
  .listen(8080);
