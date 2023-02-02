const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Peeps = require("./models/person");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/api/persons", (_, res) =>
  Peeps.find()
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error.message);
      res.status(500).end();
    })
);

app.get("/info", (_, res) =>
  Peeps.find()
    .then((result) =>
      res.send(
        `<p>Phonebook has info for ${result.length} people</p>
         <p>${new Date()}</p>`
      )
    )
    .catch((error) => {
      console.error(error.message);
      res.status(500).end();
    })
);

app.get("/api/persons/:id", (req, res) => {
  Peeps.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error.message);
      res.status(404).end();
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Peeps.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).end();
    });
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name)
    return res.status(400).json({
      error: "Name is missing",
    });

  if (!req.body.number)
    return res.status(400).json({
      error: "Number is missing",
    });

  if (req.body.name.length > 30 || req.body.name.length < 3)
    return res.status(400).json({
      error: "Name length out of scope",
    });

  if (req.body.number.length > 30 || req.body.number.length < 3)
    return res.status(400).json({
      error: "Number length out of scope",
    });

  if (!/^\p{L}+(\s\p{L}+)*$/u.test(req.body.name))
    return res.status(400).json({
      error: "Invalid name",
    });

  if (!/^\d+(?:-\d+)?$/.test(req.body.number))
    return res.status(400).json({
      error: "Invalid number",
    });

  new Peeps({
    name: req.body.name,
    number: req.body.number,
  })
    .save()
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.error(error.message);
      res.status(500).end();
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
