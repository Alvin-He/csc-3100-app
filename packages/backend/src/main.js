// backend.js
import express from "express";
import userService from "./user-service.js";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    let result = [];

    const name = req.query.name;
    if (name != undefined) {
      result = await userService.findUserByName(name);
    } else {
      result = await userService.getUsers(undefined, undefined);
    }

    const job = req.query.job;
    if (job != undefined) {
      let matched = await userService.findUserByJob(job);
      result = result.filter((x) => matched.findIndex((y) => x.id == y.id) != -1);
    }

    res.send(result); 
  } catch (error) {
    console.log(error);
    res.status(400).send("Bad Request");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  try {
    res.send(await userService.findUserById(id));
  } catch (error) {
    console.log(error)
    res.status(404).send("Resource not found.");
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  try {
    let users = await userService.addUser(userToAdd);
    console.log(users)
    res.status(201).send(users);
  } catch (error) {
    console.log(error)
    res.status(400).send("Bad Request");
  }
});

app.delete("/users/:id", async (req, res) => {
  const userToDelete = req.params.id;
  try {
    await userService.removeUser(userToDelete);
    res.status(204).send("Success");
  } catch (error) {
    console.log(error)
    res.status(400).send("Bad Request");
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
