import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('request ', req.method, req.url);
  // TODO: test method, url and generate response accordingly
  // use e.g. if-else
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Welcome to my REST API!</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
