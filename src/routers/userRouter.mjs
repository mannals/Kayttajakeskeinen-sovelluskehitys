import express from "express";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/userController.mjs";
import { logger } from "../middlewares/middlewares.mjs";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.use(logger);

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({min: 8}),
    body("email").trim().isEmail(),
    postUser
  );

userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
