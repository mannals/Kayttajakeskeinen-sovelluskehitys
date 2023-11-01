import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItems, getItemsById, postItem } from './items.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});
// get all
app.get('/api/books', getItems);

// get by id
app.get('/api/books/:id', getItemsById);

// modify
app.put('/api/books');

// add new item
app.post('/api/books', postItem);

// remove
app.delete('/api/books');

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});