import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { deleteItem, getItems, getItemsById, postItem, updateItem } from './items.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use(express.json());

// with this, you can add /api/media/[filename] to the url and it will serve the picture
app.use('/api/media', express.static(path.join(__dirname, '/media')))

app.use((req, res, next) => {
  console.log('Time: ', Date.now(), req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  const values = {title: "Getting Started with Node.js", message: "Dummy REST API docs"};
  res.render('home', values);
});

app.get('/:message', (req, res) => {
  const values = {title: "Getting Started with Node.js", message: req.params.message};
  res.render('home', values);
});

// get all
app.get('/api/media', getItems);

// get by id
app.get('/api/media/:id', getItemsById);

// modify
app.put('/api/media/:media_id', updateItem);

// add new item
app.post('/api/media', postItem);

// remove
app.delete('/api/media/:media_id', deleteItem);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});