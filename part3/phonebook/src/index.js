const express = require("express");
const app = express();
const PORT = 3001;

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
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

app.get("/api/persons/:id", (req, res) =>
  req.params.id <= data.length && req.params.id >= 1
    ? res.json(data.find((person) => person.id === Number(req.params.id)))
    : res.status(404).end()
);

app.delete("/api/persons/:id", (req, res) => {
  data = data.filter((person) => person.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
