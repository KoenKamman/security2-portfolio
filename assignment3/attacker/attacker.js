const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", function(req, res) {
  console.log(req.body);
  res.status(200);
  res.end();
});

app.use("/", express.static("scripts"));

app.listen(port, function() {
  console.log(`Attacker listening on port ${port}`);
});
