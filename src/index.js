import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mediaRouter from './routers/mediaRouter.mjs';
import userRouter from './routers/userRouter.mjs';
import likeRouter from './routers/likeRouter.mjs';
import { errorHandler, logger, notFoundHandler } from './middlewares/middlewares.mjs';
import authRouter from './routers/authRouter.mjs';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, '../uploads')));

app.use(logger);

app.use((req, res, next) => {
  console.log('Time: ', Date.now(), req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  const values = {title: "Getting Started with Node.js", message: "Dummy REST API docs"};
  res.render('home', values);
});

app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);
app.use('/api/likes', likeRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});