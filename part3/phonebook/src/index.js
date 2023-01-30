const express = require("express");
const crypto = require("crypto");
const morgan = require("morgan");

const PORT = 3001;
const app = express();
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

let data = [
  {
    id: "cabf619f",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "3f3c036b",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "85042d8b",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "529f1a61",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, res) => res.json(data));

app.get("/info", (_, res) =>
  res.send(
    `<p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>`
  )
);

app.get("/api/persons/:id", (req, res) => {
  const person = data.find((person) => person.id === req.params.id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  data = data.filter((person) => person.id !== req.params.id);
  res.status(204).end();
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

  const person = data.find(
    (person) =>
      person.name.toLocaleLowerCase() === req.body.name.toLocaleLowerCase()
  );

  if (person)
    return res.status(400).json({
      error: "Name must be unique",
    });

  data = data.concat({
    name: req.body.name,
    number: req.body.number,
    id: crypto.randomUUID().split("-")[0],
  });

  res.status(200).json(data.slice(-1)[0]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
