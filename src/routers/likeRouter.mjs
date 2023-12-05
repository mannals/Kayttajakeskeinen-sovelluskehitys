import express from 'express';
import { getUserLikes, getMediaLikes, postLike, deleteLike } from '../controllers/likeController.mjs';
import { logger } from '../middlewares/middlewares.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const likeRouter = express.Router();

likeRouter.use(logger);

likeRouter.route('/').post(postLike);
likeRouter.route('/:id').delete(authenticateToken, deleteLike);
likeRouter.route('/media/:id').get(getMediaLikes);
likeRouter.route('/user/:id').get(getUserLikes);

export default likeRouter;