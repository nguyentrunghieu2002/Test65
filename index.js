const express = require("express");
const { connectToDb, db } = require("./db");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/inventory", (req, res) => {
  db.inventories.find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/inventory", (req, res) => {
  const query = { instock: { $lt: 100 } };
  db.inventories.find(query).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const token = jwt.sign({ username }, "your_secret_key");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();
});
