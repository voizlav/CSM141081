require("dotenv").config();
const mongoose = require("mongoose");

process.argv.length < 3 || process.argv.length > 5 || process.argv.length === 4
  ? (console.error("Usage: node mongo.js password [name] [number]"),
    process.exit(1))
  : null;

process.argv.length === 5
  ? process.argv[3].length > 30 || process.argv[3].length < 3
    ? (console.error("Name length out of scope"), process.exit(1))
    : process.argv[4].length > 15 || process.argv[4].length < 3
    ? (console.error("Number length out of scope"), process.exit(1))
    : null
  : null;

process.argv.length === 5
  ? !/^\p{L}+(\s\p{L}+)*$/u.test(process.argv[3])
    ? (console.error("Invalid name"), process.exit(1))
    : !/^\d+(?:-\d+)?$/.test(process.argv[4])
    ? (console.error("Invalid number"), process.exit(1))
    : null
  : null;

!process.env.URI
  ? (console.error("A database URI must be provided in ENV"), process.exit(1))
  : null;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.URI.replace(/password/g, process.argv[2]))
  .catch((error) =>
    console.error("Failure in establishing a connection to MongoDB")
  );

const Peeps = mongoose.model(
  "Peeps",
  new mongoose.Schema({
    id: String,
    name: String,
    number: String,
  })
);

if (process.argv.length === 3)
  Peeps.find().then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
else
  new Peeps({
    name: process.argv[3],
    number: process.argv[4],
  })
    .save()
    .then((result) => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
