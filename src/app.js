const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send(`Hello from test path`);
});

app.use("/hello", (req, res) => {
  res.send("Hello from hello path");
});

app.listen(3000, () => {
  console.log(`Server is listening...`);
});
