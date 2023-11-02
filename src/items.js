import mediaJson from "./media.json" assert {type: 'json'};

const media = mediaJson.media;

/**
 * GET all books (if query includes requirements, all books fulfilling it)
 * @param {*} req - http request
 * @param {*} res - http response
 */
const getItems = (req, res) => {
  const limit = req.query.language;
  // TODO: check that the value is valid
  if (limit) {
    res.json(media.filter((medium) => medium.language === limit));
  } else {
    res.json(media);
  }
};

/**
 * GET book by ID
 * @param {*} req - http request
 * @param {*} res - http response
 */
const getItemsById = (req, res) => {
  // TODO: if item with id exists send it, otherwise 404
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
 * PUT new value to existing book
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
    res.end('{"message": "Couldn`t update media item!"}');
  }
}

/**
 * POST new book
 * @param {*} req - http request
 * @param {*} res - http response
 */
const postItem = (req, res) => {
  console.log('new item posted', req.body);
  const newId = media[media.length-1].media_id + 1;
  if (req.body.filename && req.body.title && req.body.description && req.body.user_id && req.body.media_type) {
    media.push({media_id: newId, filename: req.body.filename, title: req.body.title, description: req.body.description, user_id: req.body.user_id, media_type: req.body.media_type});
    res.sendStatus(201);
  } else {
    res.sendStatus(401);
    res.end('{"message": "Couldn`t add media item!"}');
  }
};

/**
 * DELETE book
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