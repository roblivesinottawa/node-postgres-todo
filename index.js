const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send({ message: "Welcome to the Node with Postgres App" }),
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App listening at localhost:${PORT}`));
