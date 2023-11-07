import mediaJson from "./media.json" assert {type: 'json'};

const media = mediaJson.media;

/**
 * GET all media
 * @param {*} req - http request
 * @param {*} res - http response
 */
const getItems = (req, res) => {
  res.json(media);
};

/**
 * GET media by ID
 * @param {*} req - http request
 * @param {*} res - http response
 */
const getItemsById = (req, res) => {
  console.log("getItemsById", req.params);
  const medium = media.find((element) => element.media_id == req.params.id);
  if (medium) {
    res.json(medium);
  } else {
    res.status(404);
    res.json({message: "Media not found."})
  };
};

/**
 * PUT new value to existing media
 * @param {*} req - http request
 * @param {*} res - http response
 */
const updateItem = (req, res) => {
  console.log("updateItem", req.params.id);
  const medium = media.find((el) => el.media_id == req.params.media_id);
  if (medium) {
    if (req.body.title) medium.title = req.body.title;
    if (req.body.description) medium.description = req.body.description;
    res.sendStatus(201);
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end('{"message": "Couldn`t update media item!"}');
  }
}

/**
 * POST new media
 * @param {*} req - http request
 * @param {*} res - http response
 */
const postItem = (req, res) => {
  console.log('new item posted', req.body);
  const newId = Math.floor(Math.random() * (9999 - 1000) + 1000);
  const now = new Date();
  if (req.body.filename && req.body.title && req.body.description && req.body.user_id && req.body.media_type) {
    media.push({media_id: newId, filename: req.body.filename, title: req.body.title, description: req.body.description, user_id: req.body.user_id, media_type: req.body.media_type, created_at: now.toISOString()});
    res.sendStatus(201);
  } else {
    res.sendStatus(401);
    res.end('{"message": "Couldn`t add media item!"}');
  }
};

/**
 * DELETE media
 * @param {*} req - http request
 * @param {*} res - http response
 */
const deleteItem = (req, res) => {
  const medium = media.find((el) => el.media_id == req.params.media_id);
  if (!medium) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Book not found!"}');
  }
  console.log("deleteItem", req.params.media_id);
  const index = media.indexOf(medium);
  media.splice(index, 1);
  res.writeHead(204, { "Content-Type": "application/json" });
  res.end('{"message": "Media item deleted."}');
};

export { getItems, getItemsById, updateItem, postItem, deleteItem };