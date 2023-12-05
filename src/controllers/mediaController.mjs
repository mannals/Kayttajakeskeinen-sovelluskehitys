import {addMedia, findMediaById, listAllMedia, updateMedia, removeMedia} from "../models/mediaModel.mjs";
import { validationResult } from "express-validator";

const getMedia = async (req, res, next) => {
  const result = await listAllMedia();
  if (!result.error) {
    res.json(result);
  } else {
    const error = new Error('could not find media');
    error.status = 500;
    return next(error);
  }
};

const getMediaById = async (req, res, next) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    const error = new Error('media not found');
    error.status = 404;
    return next(error);
  }
};

const postMedia = async (req, res, next) => {

  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('postMedia errors', errors.array());
    const error =  new Error('invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  const {title, description} = req.body;
  const {filename, size, mimetype} = req.file;
  const user_id = req.user.user_id;
  if (filename && title && user_id) {
    const result = await addMedia({filename, size, mimetype, title, description, user_id});
    if (result.error) {
      return next(new Error(result.error));
    }
    if (result.media_id) {
      res.status(201);
      res.json({message: 'New media item added.', ...result});
    } else {
      const error = new Error('could not add media');
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('invalid or missing fields');
    error.status = 400;
    return next(error);
  }
};

const putMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status(400);
    return next(error);
  }

  const media_id = req.params.id;
  const {filename, title, description} = req.body;
  const user_id = req.user.user_id;
  if (media_id && filename && title && description) {
    const result = await updateMedia({user_id, media_id, filename, title, description});
    if (result.media_id) {
      res.status(200);
      res.json({message: 'Successfully updated item.', ...result});
    } else {
      const error = new Error('could not edit media');
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('invalid or missing fields');
    error.status = 400;
    return next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  const media = await findMediaById(req.params.id);
  console.log(media);
  console.log('deleteMedia request body', req.user);
  if (media.user_id === req.user.user_id) {
    const result = await removeMedia(req.params.id);
    if (result) {
      return res.status(204).json({message: "Item deleted successfully"});
    } else {
      const error = new Error('could not delete media');
      error.status = 404;
      return next(error);
    }
  } else {
      const error = new Error('invalid or missing media file');
      error.status = 404;
      return next(error);
  }
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};