import express from 'express';
import { getUserLikes, getMediaLikes, postLike, deleteLike } from '../controllers/likeController.mjs';
import { logger } from '../middlewares/middlewares.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const likeRouter = express.Router();

likeRouter.use(logger);

/**
 * @apiDefine all No authentication needed.
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 403 Forbidden
 *  {
 *   "error": {
 *  "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 */
likeRouter.route('/').post(postLike);

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 * 
 * @apiHeader {String} Authorization Authentication token.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 * 
 *  }
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *   {
 *    "error": {
 *     "message": "username/password invalid",
 *    "status": 401
 *    }
 *  }
 * 
 */
likeRouter.route('/:id').delete(authenticateToken, deleteLike);

/**
 * @api {get} /likes/media/:id Get media likes
 * @apiVersion 1.0.0
 * @apiName GetMediaLikes
 * @apiGroup Likes
 * @apiPermission all
 * 
 * @apiDescription Get media likes.
 * 
 * @apiParam {Number} id Media id.
 * 
 * @apiSuccess {Object[]} likes List of likes.
 * @apiSuccess {Number} likes.id Like id.
 * @apiSuccess {Number} likes.user_id User id.
 * @apiSuccess {Number} likes.media_id Media id.
 * @apiSuccess {String} likes.created_at Like creation date.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 * "likes": [
 * {
 * "id": 1,
 * "user_id": 1,
 * "media_id": 1,
 * "created_at": "2021-07-27T11:45:37.000Z"
 * },
 * {
 * "id": 2,
 * "user_id": 2,
 * "media_id": 1,
 * "created_at": "2021-07-27T11:45:37.000Z"
 * }
 * ]
 * }
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 */
likeRouter.route('/media/:id').get(getMediaLikes);

/**
 * @api {get} /likes/user/:id Get user likes
 * @apiVersion 1.0.0
 * @apiName GetUserLikes
 * @apiGroup Likes
 * @apiPermission all
 * 
 * @apiDescription Get user likes.
 * 
 * @apiParam {Number} id User id.
 * 
 * @apiSuccess {Object[]} likes List of likes.
 * @apiSuccess {Number} likes.id Like id.
 * @apiSuccess {Number} likes.user_id User id.
 * @apiSuccess {Number} likes.media_id Media id.
 * @apiSuccess {String} likes.created_at Like creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "likes": [
 * {
 * "id": 1,
 * "user_id": 1,
 * "media_id": 1,
 * "created_at": "2021-07-27T11:45:37.000Z"
 *  },
 * {
 * "id": 2,
 * "user_id": 1,
 * "media_id": 2,
 * "created_at": "2021-07-27T11:45:37.000Z"
 * }
 * ]
 * }
 * 
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 403 Forbidden
 * {
 * "error": {
 * "message": "username/password invalid",
 * "status": 401
 * }
 * }
 * 
 */
likeRouter.route('/user/:id').get(getUserLikes);

export default likeRouter;