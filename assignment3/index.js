const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

let messages = [];
const users = [
  {
    name: "user1",
    password: "password1"
  },
  {
    name: "user2",
    password: "password2"
  }
];
const SECRET = "super-secret-key";

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.get("/messages", (req, res) => res.json(messages));
app.post("/auth", (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (!user || user.password !== req.body.password) {
    res.json({ success: false, message: "Name or password is incorrect" });
  } else {
    const token = jwt.sign({ user: user.name }, SECRET, {
      expiresIn: "1h"
    });
    res.json({ success: true, message: "Signed in succesfully", token });
  }
});
app.use((req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: "Authentication token could not be verified."
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});
app.post("/message", (req, res) => {
  messages.push({ user: req.decoded.user, message: req.body.message });
  res.send();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
