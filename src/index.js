import http from 'http';
import fs from 'fs/promises';
import {getItems, getItemsById, updateItem, postItem, deleteItem} from './items.js';

const hostname = '127.0.0.1';
const port = 3000;
let indexFile;


const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);

  const {method, url} = req;
  const reqParts = url.split('/');

  if (method === 'GET' && url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexFile);
  } else if (method === 'GET' && reqParts[1] === 'books' && url.split('/')[2]) {
    console.log('GETting book with ID', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] == 'books') {
    console.log('GETting books');
    getItems(res);
  } else if (method === 'POST') {
    console.log('Posting..');
    postItem(req, res);
  } else if (method === 'DELETE') {
    console.log('Deleting book with ID', reqParts[2]);
    deleteItem(res, reqParts[2]);
  } else if (method === 'PUT' ) {
    console.log('Updating book with ID', reqParts[2]);
    updateItem(req, res, reqParts[2]);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "404 resource not found!"}');
  }
});

fs.readFile("./src/index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, hostname, () => {
            console.log(`Server is running on http://${hostname}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });