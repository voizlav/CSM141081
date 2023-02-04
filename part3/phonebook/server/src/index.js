const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
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

app.get("/api/persons", (_, res, next) =>
  Peeps.find()
    .then((result) => res.json(result))
    .catch((error) => next(error))
);

app.get("/info", (_, res, next) =>
  Peeps.find()
    .then((result) =>
      res.send(
        `<p>Phonebook has info for ${result.length} people</p>
         <p>${new Date()}</p>`
      )
    )
    .catch((error) => next(error))
);

app.get("/api/persons/:id", (req, res, next) => {
  Peeps.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Peeps.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  new Peeps({
    name: req.body.name,
    number: req.body.number,
  })
    .save()
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  Peeps.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error));
});

const notFound = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};
app.use(notFound);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error instanceof mongoose.Error.ValidationError)
    return res.status(400).json({
      error: error.message,
    });
  else if (error instanceof mongoose.Error.CastError)
    return res.status(400).json({
      error: "Malformatted ID",
    });
  else
    return res.status(500).json({
      error: "Internal Server Error",
    });
};
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
