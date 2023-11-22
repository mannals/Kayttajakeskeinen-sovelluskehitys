import express from 'express';
import { postLogin } from '../controllers/authController.mjs';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);

export default authRouter;