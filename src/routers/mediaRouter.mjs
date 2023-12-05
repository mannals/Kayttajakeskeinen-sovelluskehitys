import express from "express";
import {
  postMedia,
  getMedia,
  getMediaById,
  putMedia,
  deleteMedia,
} from "../controllers/mediaController.mjs";
import { logger } from "../middlewares/middlewares.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";
import upload from "../middlewares/upload.mjs"; 

const mediaRouter = express.Router();

mediaRouter.use(logger);

/**
 * @apiDefine all No authentication needed.
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
mediaRouter
  .route("/")
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single("file"),
    body("title").trim().isLength({min: 3}),
    body("description"),
    postMedia
);

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 * 
 * @apiHeader {String} Authorization Authentication token.
 * 
 * @apiHeaderExample {json} Header-Example:
 *  {
 * 
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
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(authenticateToken, putMedia)
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;
