import {addMedia, findMediaById, listAllMedia, updateMedia, removeMedia} from "../models/mediaModel.mjs";
import { validationResult } from "express-validator";

const getMedia = async (req, res) => {
  const result = await listAllMedia();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({message: 'file missing or invalid'});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({message: 'validation error'});
  }
  const {title, description} = req.body;
  const {filename, size, mimetype} = req.file;
  const user_id = req.user.user_id;
  if (filename && title && user_id) {
    const result = await addMedia({filename, size, mimetype, title, description, user_id});
    if (result.media_id) {
      res.status(201);
      res.json({message: 'New media item added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.status(400);  
  }
};

const putMedia = async (req, res) => {
  const media_id = req.params.id;
  const {filename, title, description} = req.body;
  if (media_id && filename && title && description) {
    const result = await updateMedia({media_id, filename, title, description});
    if (result.media_id) {
      res.status(200);
      res.json({message: 'Successfully updated item.', ...result});
    } else {
      res.status(404);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const deleteMedia = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    const result = await removeMedia(req.params.id);
    if (result) {
      res.json({message: "Item deleted successfully"});
    } else {
      res.status(404);
    }
  } else {
    res.sendStatus(404);
  }
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};