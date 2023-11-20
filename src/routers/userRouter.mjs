import express from 'express';
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/userController.mjs';
import { logger } from '../middlewares/middlewares.mjs';

const userRouter = express.Router();

userRouter.use(logger);

userRouter.route('/').get(getUsers).post(postUser);
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;