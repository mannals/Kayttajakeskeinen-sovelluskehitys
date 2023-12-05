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
import { authenticateToken } from "../middlewares/authentication.mjs";

const userRouter = express.Router();

userRouter.use(logger);

/**
 * @apiDefine all No authentication needed.
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 * 
 * @api {get} /users Get users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission all
 * 
 * @apiDescription Get users.
 * 
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.id User id.
 * @apiSuccess {String} users.username User username.
 * @apiSuccess {String} users.email User email.
 * @apiSuccess {String} users.password User password.
 * @apiSuccess {String} users.user_level_id User level id.
 * @apiSuccess {String} users.createdAt User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "users": [
 * {
 * "id": 1,
 * "username": "user1",
 * "email": "
 * "password": "12345678",
 * "user_level_id": 1,
 * "createdAt": "2021-07-27T11:45:37.000Z",
 * }
 * ]
 * }
 * 
 * 
 * @api {post} /users Create user
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup Users
 * @apiPermission all
 * 
 * @apiDescription Create user.
 * 
 * @apiSuccess {Object} user User.
 * @apiSuccess {Number} user.id User id.
 * @apiSuccess {String} user.username User username.
 * @apiSuccess {String} user.email User email.
 * @apiSuccess {String} user.password User password.
 * @apiSuccess {String} user.user_level_id User level id.
 * @apiSuccess {String} user.createdAt User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user": {
 * "id": 1,
 * "username": "user1",
 * "email": "test.example.com",
 * "password": "12345678",
 * "user_level_id": 1,
 * "createdAt": "2021-07-27T11:45:37.000Z",
 * }
 * }
 * 
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 * 
 * @apiError ValidationError Username, password or email invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 * "error": {
 * "message": "username/password/email invalid",
 * "status": 400
 * }
 * }
 * 
 * 
 */
userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({min: 8}),
    body("email").trim().isEmail(),
    postUser
  );


/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 * 
 * @apiHeader {String} Authorization Authentication token.
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 * 
 * }
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 * 
 * @api {get} /users/:id Get user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 * @apiPermission token
 * 
 * @apiDescription Get user.
 * 
 * @apiParam {Number} id User id.
 * 
 * @apiSuccess {Object} user User.
 * @apiSuccess {Number} user.id User id.
 * @apiSuccess {String} user.username User username.
 * @apiSuccess {String} user.email User email.
 * @apiSuccess {String} user.password User password.
 * @apiSuccess {String} user.user_level_id User level id.
 * @apiSuccess {String} user.createdAt User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user": {
 * "id": 1,
 * "username": "user1",
 * "email": "test.example.com",
 * "password": "12345678",
 * "user_level_id": 1,
 * "createdAt": "2021-07-27T11:45:37.000Z",
 * }
 * }
 * 
 * 
 * @api {put} /users/:id Update user
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup Users
 * @apiPermission token
 * 
 * @apiDescription Update user.
 * 
 * @apiParam {Number} id User id.
 * 
 * @apiSuccess {Object} user User.
 * @apiSuccess {Number} user.id User id.
 * @apiSuccess {String} user.username User username.
 * @apiSuccess {String} user.email User email.
 * @apiSuccess {String} user.password User password.
 * @apiSuccess {String} user.user_level_id User level id.
 * @apiSuccess {String} user.createdAt User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user": {
 * "id": 1,
 * "username": "user1",
 * "email": "test.example.com",
 * "password": "12345678",
 * "user_level_id": 1,
 * "createdAt": "2021-07-27T11:45:37.000Z",
 * }
 * }
 * 
 * 
 * @api {delete} /users/:id Delete user
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission token
 * 
 * @apiDescription Delete user.
 * 
 * @apiParam {Number} id User id.
 * 
 * @apiSuccess {Object} user User.
 * @apiSuccess {Number} user.id User id.
 * @apiSuccess {String} user.username User username.
 * @apiSuccess {String} user.email User email.
 * @apiSuccess {String} user.password User password.
 * @apiSuccess {String} user.user_level_id User level id.
 * @apiSuccess {String} user.createdAt User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user": {
 * "id": 1,
 * "username": "user1",
 * "email": "test.example.com",
 * "password": "12345678",
 * "user_level_id": 1,
 * "createdAt": "2021-07-27T11:45:37.000Z",
 * }
 * }
 * 
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 */
userRouter
  .route("/:id")
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
