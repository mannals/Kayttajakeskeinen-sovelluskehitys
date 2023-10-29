let items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "All items", "items": ${jsonItems}}`);
};

const getItemsById = (res, id) => {
  // TODO: if item with id exists send it, otherwise 404
  console.log("getItemsById", id);
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found!"}');
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
      const item = items.find((element) => element.id == id);
      if (!item) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end('{"message": "Item with ID not found!"}');
      }
      const objIndex = items.findIndex((obj => obj.id == id));
      items[objIndex].name = body.name;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('{"message": "Item updated."}');
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
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end('{"message": "Missing data!"}');
      }
      const newId = items[items.length - 1].id + 1;
      items.push({ id: newId, name: body.name });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end('{"message": "New item added."}');
    });
};

const deleteItem = (res, id) => {
  console.log("deleteItem", id);
  const item = items.find((el) => el.id == id);
  if (item) {
    res.writeHead(204, { "Content-Type": "application/json" });
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items.splice(i, 1);
        break;
      }
    }
    res.end(`{"message": "Item with the ID of ${id} successfully deleted."}`);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found!"}');
  }
};

export { getItems, getItemsById, updateItem, postItem, deleteItem };