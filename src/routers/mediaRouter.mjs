import express from 'express';
import multer from 'multer';
import { postMedia, getMedia, getMediaById, putMedia, deleteMedia } from '../controllers/mediaController.mjs';
import { logger } from '../middlewares/middlewares.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const mediaRouter = express.Router();
const upload = multer({dest: 'uploads/'});

mediaRouter.use(logger);

mediaRouter.route('/').get(getMedia).post(authenticateToken, upload.single('file'), postMedia);
mediaRouter.route('/:id').get(getMediaById).put(putMedia).delete(deleteMedia);


export default mediaRouter;