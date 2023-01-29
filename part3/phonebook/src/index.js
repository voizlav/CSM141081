const express = require("express");
const app = express();
const PORT = 3001;

const data = [
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
  Number(req.params.id) > data.length || Number(req.params.id) < 1
    ? res.status(404).end()
    : res.json(data.filter((person) => person.id === Number(req.params.id)))
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
