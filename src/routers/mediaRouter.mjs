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
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(authenticateToken, putMedia)
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;
