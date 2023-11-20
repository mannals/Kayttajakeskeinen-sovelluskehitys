import express from 'express';
import multer from 'multer';
import { postMedia, getMedia, getMediaById, putMedia, deleteMedia } from '../controllers/mediaController.mjs';
import { logger } from '../middlewares/middlewares.mjs';

const mediaRouter = express.Router();
const upload = multer({dest: 'uploads/'});

mediaRouter.use(logger);

mediaRouter.route('/').get(getMedia).post(upload.single('file'), postMedia);
mediaRouter.route('/:id').get(getMediaById).put(putMedia).delete(deleteMedia);


export default mediaRouter;