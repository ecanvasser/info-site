let http = require("http");
let fs = require("fs");
let url = require("url");

http
  .createServer((req, res) => {
    let reqPath = url.parse(req.url);
    let fileName = "." + reqPath.pathname + ".html";

    if (reqPath.pathname === "/" || reqPath.pathname === "/favicon.ico") {
      fs.readFile("index.html", "utf8", (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end();
      });
    } else {
      fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
          fs.readFile("./404.html", (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
          });
        }
        res.write(data);
        res.end();
      });
    }
  })
  .listen(8080);
