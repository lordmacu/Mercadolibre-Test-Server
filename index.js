const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = 3010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/api/items", async (req, res) => {
  if (!!req.query.q) {
    let response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );
    let data = await response.json();
    res.send({ data: data, code: 200, message: "ok" });
  } else {
    res.status(500);

    res.send({ data: null, code: 500, message: "error" });
  }
});

app.post("/api/items/:id", async (req, res) => {
  if (!!req.params.id) {
    let response = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    let data = await response.json();
    res.send({ data: data, code: 200, message: "ok" });
  } else {
    res.status(500);

    res.send({ data: null, code: 500, message: "error" });
  }
});

app.post("/api/items/:id/description", async (req, res) => {
  if (!!req.params.id) {
    let response = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );
    let data = await response.json();
    res.send({ data: data, code: 200, message: "ok" });
  } else {
    res.status(500);

    res.send({ data: null, code: 500, message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
