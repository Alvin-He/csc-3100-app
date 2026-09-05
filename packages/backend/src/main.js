// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const removeUserById= (id) => {
    let idx = users["users_list"].findIndex((x) => x.id === id);
    if (idx >= 0) users["users_list"].splice(idx, 1)
    else return false
    return true
}

app.delete("/users/:id", (req, res) => {
    const userToDelete = req.params.id;
    if (removeUserById(userToDelete)) res.status(200).send("Success");
    else res.status(404).send("Not Found");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
