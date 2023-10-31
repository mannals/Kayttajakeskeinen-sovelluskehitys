import bookJson from "./books.json" assert {type: 'json'};

const books = bookJson.books;

const getItems = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const booksString = JSON.stringify(books);
  res.end(`{"message": "All items", "items": ${booksString}}`);
};

const getItemsById = (res, id) => {
  // TODO: if item with id exists send it, otherwise 404
  console.log("getItemsById", id);
  const book = books.find((element) => element.id == id);
  if (book) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(book));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Book not found!"}');
  }
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
      if (!body.name || !body.author || !body.language || !body.pages || !body.status) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end('{"message": "Missing data!"}');
      }
      const newId = books[books.length - 1].id + 1;
      books.push({ id: newId, name: body.name, author: body.author, language: body.language, pages: body.pages, status: body.status });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end('{"message": "New book added."}');
    });
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