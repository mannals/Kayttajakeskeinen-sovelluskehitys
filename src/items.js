import bookJson from "./books.json" assert {type: 'json'};

const books = bookJson.books;

const getItems = (req, res) => {
  const booksString = JSON.stringify(books);
res.json(books);
};

const getItemsById = (req, res) => {
  // TODO: if item with id exists send it, otherwise 404
  console.log("getItemsById", req.params);
  const book = books.find((element) => element.id == req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    res.json({message: "Book not found."})
  };
};

const updateItem = (req, res, id) => {
  console.log("updateItem", id);
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);
      const book = books.find((element) => element.id == id);
      if (!book) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end('{"message": "Book with ID not found!"}');
      }
      book.status = body.status;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('{"message": "Book updated."}');
    });
}

const postItem = (req, res) => {
  console.log('new item posted', req.body);
  const newId = books[books.length - 1].id + 1;
  if (req.body.name && req.body.author && req.body.language && req.body.pages && req.body.status) {
    books.push({id: newId, name: req.body.name, author: req.body.author, language: req.body.language, pages: req.body.pages, status: req.body.status});
    res.sendStatus(201);
  }
};

const deleteItem = (res, id) => {
  const book = books.find((el) => el.id == id);
  if (!book) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Book not found!"}');
  }
  console.log("deleteItem", id);
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.writeHead(204, { "Content-Type": "application/json" });
  res.end('{"message": "Book deleted."}');
};

export { getItems, getItemsById, updateItem, postItem, deleteItem };